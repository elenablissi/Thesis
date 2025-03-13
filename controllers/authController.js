/*
Controller functions for handling the 
Login/Register/LogOut routes

@author Elena Blisi
*/

// Import Passport.js for authentication
import passport from 'passport';
// Import Nodemailer for sending emails
import nodemailer from 'nodemailer';
// Import bcrypt for password hashing
import bcrypt from 'bcrypt'; 
// Import database connection
import db from '../config/database.js'; 


// Get the number of salt rounds for bcrypt from env variables
const saltRounds = parseInt(process.env.SALT_ROUNDS); 



// Login GET
export const getLogin = (req, res) => {
    let loginError = "";
    if (req.session.loginError) {
      loginError = req.session.loginError // Retrieve login error from session if it exists
      req.session.loginError = null; // Clear variable after first time
    }

    // Check if login request was triggered by a booking error
    const showBookingError = req.query.source === "book" ; 
    
    // Render the login page, passing page name, login error, and booking error status
    res.render("login.ejs", { page: 'login', loginError, showBookingError });
};



// Login POST
export const postLogin = (req, res, next) => {
    console.log("Login POST request received");
     // Use Passport.js to authenticate the user with the "local" strategy
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return next(err);
      }
      if (!user) {
        console.log("Authentication failed:", info.message);
        // Store the authentication error message in the session
        req.session.loginError = info.message;
        // Redirect to login page
        return res.redirect("/login");  
      }
      // Reset any login error if it exists
      req.session.loginError = false;

      // Log in the user
      req.logIn(user, (err) => {
        if (err) return next(err);
        // Redirect based on user's admin status
        res.redirect(user.is_admin ? '/adminDashboard' : '/myBookings');
      });
    })(req, res, next);
  };



// Register GET
export const getRegister = async (req, res) => {
    try {
      // Fetch the list of countries from the database
      const countriesResult = await db.query("SELECT * from countries");
      // Extract rows from the query result
      const countries = countriesResult.rows;

       // Fetch existing emails from the database
      const emailsResult = await db.query("SELECT email from users");
       // Extract and map emails
      const emails = emailsResult.rows.map(row => row.email);

       // Render the registration page passing page name, list of countries and emails
      res.render("register.ejs", { page: 'register', countries, emails }); 
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data."); // Send error response if query fails
    }
  };



// Register POST
export const postRegister = async (req, res) => {
    // Get first name, last name, email, password and phone from request body
    const fName = req.body.first_name;
    const lName = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.full_phone_number;
    
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport ( {
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, // Admin email address to send emails to users
        pass: process.env.EMAIL_PASS // Admin email password
      }
    });

    // Email options and structure for sending registration confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:`Welcome to SkylineShine`,
      html:'<p>Your account has been created successfully.</p><p>Best Regards,<br>SkylineShine Team</p>'
    };
  
    try {
      // Check if email already exists in the users table
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      // Hash the password using bcrypt
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err); // Log any hashing errors
        } else {
          // Insert the new user into the users table
          const result = await db.query(
            "INSERT INTO users (first_name, last_name, email, password, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [fName, lName, email, hash, phone]
          );
          // Extract newly created user
          const user = result.rows[0];
          // Log in the user after successful registration
          req.login(user, (err) => {
            console.log("success");
            // Send registration confirmation email
            transporter.sendMail(mailOptions);
            // Redirect to myBookings page
            res.redirect("/myBookings");
          });
        }
      });
    } catch (err) {
      // Log any errors during registration
      console.log(err);
    }
  };


// Logout
export const logout = (req, res, next) => {
    console.log("Logging out...");
    // Log out the user using Passport.js
    req.logout((err) => {
        if (err) {
            console.log("Logout error:", err);
            return next(err);
        }
        // Destroy session data
        req.session.destroy((err) => {
            if (err) {
                console.log("Session destruction error:", err);
                return res.status(500).send("Error while logging out.");
            }
            // Clear the session cookie
            res.clearCookie('connect.sid', { path: '/' });
             // Redirect to the home page
            res.redirect("/");
        });
    });
};


// Google Authentication using Google OAuth
export const googleAuth = passport.authenticate('google', {
    // Request access to Google profile and email
    scope: ["profile", "email"],
  });
  
// Google callback
export const googleCallback = passport.authenticate('google', {
      // Redirect to bookings page upon success
      successRedirect: "/myBookings",
      // Redirect to login page upon failure
      failureRedirect: "/login",
    });

//Auth Status, check if the user is authenticated
export const getAuthStatus = (req, res) => {
  // Respond with the user's authentication status and user info if authenticated
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null
  });
};
