/*
Controller functions for handling 
user account related routes

@author Elena Blisi
*/

// Import bcrypt for hashing passwords
import bcrypt from 'bcrypt';
// Import database connection
import db from '../config/database.js';


// Middleware to handle user redirection based on admin status
export const getUserAccount =  (req, res) => {
    if (req.user.is_admin) {
      // Redirect admin users to the admin dashboard
      res.redirect('/adminDashboard');
    } else {
      // Redirect regular users to their bookings page
      res.redirect('/myBookings');
    }
  };



// Middleware to render the user's bookings page
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the user's ID from the session


    // Fetch the user's details from the database
    const userResult = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = userResult.rows[0];
    const firstName = req.user.first_name; // Get the user's first name

    // Fetch the user's upcoming bookings from the database
    const bookingResult = await db.query(
      `SELECT b.id, b.service_id, b.date, b.time, b.location, s.title AS service_title
        FROM bookings b
        JOIN services s ON b.service_id = s.id
        WHERE b.user_id = $1 AND b.date >= CURRENT_DATE
        ORDER BY b.date ASC`,
      [userId]
  );

    // Store the retrieved bookings
    const bookings = bookingResult.rows;
    // Render the myBookings page with the retrieved data
    res.render("myBookings.ejs", { 
      page: "myBookings",
      firstName: firstName,
      bookings: bookings 
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).send("Error retrieving your bookings"); // Send an error response
  }
};



// Middleware to render the account settings page
export const getAccountSettings = async (req, res) => {
  try {
    // Fetch logged in user's details from the database
    const userId = req.user.id;
    const userResult = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    const userDetails = userResult.rows[0];
    const countriesResult = await db.query(`
      SELECT *
      FROM countries
    `);
    const countries = countriesResult.rows;
    
    // Initialize session flags for form status
    if (typeof req.session.detailsUpdated === "undefined") req.session.detailsUpdated = "none";
    var updated = req.session.detailsUpdated;
    req.session.detailsUpdated = "none"; // Reset the flag after use

    if (typeof req.session.oldPasswordError === "undefined") req.session.detailsUpdated = "0";
    var oldPasswordError = req.session.oldPasswordError;
    req.session.oldPasswordError = "0"; // Reset the flag after use
      
     // Render the account settings page with user details and form status
    res.render("accountSettings.ejs", { page: 'accountSettings', userDetails, countries, updated, oldPasswordError});
  } catch (err) {
    console.error("Error fetching user settings:", err);
    res.status(500).send("Error fetching user settings."); // Send an error response
  }
};



// Middleware to handle personal details update and password change
export const updatePersonalDetails = async (req, res) => {
  try {
    // Fetch logged in user's details from the database
    const userId = req.user.id;

    // Determine the operation (personal details update or password change)
    const operation = req.body.operation;

    if (operation == 0) {
      // Update personal details
      const fName = req.body.first_name;
      const lName = req.body.last_name;
      const email = req.body.email;
      const phone = req.body.full_phone_number;
      await db.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE id = $5", [fName, lName, email, phone, userId]);
      req.session.detailsUpdated = "personal"; // Set session flag for successful update
    }else if (operation == 1) {

      // Change the password
      const oldPassword = req.body.old_password;
      const newPassword = req.body.password;

      // Fetch the user's current password hash from the database
      const result = await db.query("SELECT password FROM users WHERE id = $1", [userId]);
      const user = result.rows[0];

      if (!user) {
        // Handle case where user is not found
        return res.status(404).send("User not found");
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      // Compare the old password with the stored hash
      if (!isMatch) {
        req.session.oldPasswordError = "1"; // Set session flag for incorrect old password
        res.redirect("/accountSettings");
      }

      // Hash the new password
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      // Update the user's password 
      await db.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);
      req.session.detailsUpdated = "password"; // Set session flag for successful password change
    }

    res.redirect("/accountSettings"); // Redirect to the account settings page
  } catch (err) {

    console.error("Error updating user's personal details:", err);
    res.status(500).send("Error updating user's personal details."); // Send an error response
  }
};

// Middleware to render the admin dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    // Fetch all upcoming bookings along with service and user details
    const result = await db.query(`
      SELECT b.id, b.service_id, b.date, b.time, b.location, b.map_url, s.title AS service_title, u.first_name, u.last_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      WHERE b.date >= CURRENT_DATE
      ORDER BY b.date ASC
    `);
    const bookings = result.rows; // Store the retrieved bookings
    // Render the admin dashboard with the retrieved data
    res.render("adminDashboard.ejs", { page: 'adminDashboard', bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).send("Error retrieving bookings."); // Send an error response
  }
};