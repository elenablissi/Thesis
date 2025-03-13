/*
Controller functions for handling all 
Booking routes

@author Elena Blisi
*/

// Import database connection
import db from '../config/database.js';
// Import Nodemailer for sending emails
import nodemailer from "nodemailer"



// Booking Route (GET)
export const getBookingPage = async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        try {       
            // If the user made a booking display success message
            if (req.session.booked != null) {
              const bookSucccess = req.session.booked; // Retrieve booking success flag
              req.session.booked = null; // Clear the booked from the session

               // Render the submit booking form
               res.render("book.ejs", { page: "book", bookSucccess });  // Pass the variables to the template
            } else {
              // If first time accessing booking page
              const bookSucccess = null; // No booking success message
              const mapApiKey = process.env.GEOAPIFY_API_KEY; // Fetch Geoapify API key for map

              // Fetch available services from the database
              const servicesResult = await db.query("SELECT * FROM services");
              const services = servicesResult.rows;

              // Fetch countries from the database
              const countriesResult = await db.query("SELECT * from countries");
              const countries = countriesResult.rows;

              // Fetch logged in user's details from the database
              const userId = req.user.id;
              const userResult = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
              const user = userResult.rows[0];
              
              // Render the booking form with the fetched data
              res.render("book.ejs", { page: "book", bookSucccess, services, countries, user , mapApiKey });  // Pass the variables to the template
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data."); // Handle database query errors
        }
    } else {
        res.redirect("/login?source=book"); // Redirect to login if not authenticated / logged in
    }
};



// Endpoint to get available time slots for a given date
export const availability = async (req, res) => {
    // Extract the date from the query parameters
    const { date } = req.query;
  
    if (!date) {
      // Respond with error if date is missing
      return res.status(400).json({ error: 'Date is required' });
    }
  
    try {
      // Define all available time slots
      const allTimeSlots = ['06:30', '09:00', '11:30', '14:00', '15:00'];
  
      // Fetch booked times for the given date
      const result = await db.query('SELECT time FROM bookings WHERE date = $1', [date]);
      // Extract booked times
      const bookedTimes = result.rows.map(row => row.time);
  
      // Filter out booked times
      const availableTimes = allTimeSlots.filter(time => !bookedTimes.includes(time+":00"));
      // Respond with available time slots
      res.json(availableTimes);
    } catch (err) {
      console.error('Error fetching available times:', err);
      res.status(500).json({ error: 'Error fetching available times' });
    }
  };



// Booking Route POST
export const postBooking = async (req, res) => {
    if(req.isAuthenticated()) {
      const {service_id, full_address, date, time, extra, make, model, year, num_plate, first_name, last_name, email, full_phone_number, map_url} = req.body;
      // Get user ID from authenticated session
      const user_id = req.user.id;

      const serviceNameResult = await db.query("SELECT title FROM services WHERE id = $1", [service_id]);
      const serviceName = serviceNameResult.rows[0].title; // Fetch service name based on service ID
  
      // Create a Nodemailer transporter object for sending booking confirmation email
      const transporter = nodemailer.createTransport ( {
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER, // Admin email address
          pass: process.env.EMAIL_PASS // Admin email password
        }
      });
  
      // Email options and structure for confirmation email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject:`Booking Confirmation`,
        html: `<h3>You have successfully booked your mobile detailing appointment for your ${make} - ${model} with SkylineShine!</h3> 
        <p><strong>Details of your booking:</strong><br><strong>Service:</strong> ${serviceName}<br><strong>Address:</strong> ${full_address}<br><strong>Date:</strong> ${date}<br><strong>Time:</strong> ${time}</p>
        <p>We will get in touch with you at least 24h before your booking date.</p>
        <p>Best Regards,<br>SkylineShine Team</p>`
      };
  
       try {
        //Insert the bookin'g data into the bookings table
        const bookingResult = await db.query("INSERT INTO bookings (user_id, service_id, location, date, time, extra, map_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", [user_id, service_id, full_address, date, time, extra, map_url]);
        const bookingId = bookingResult.rows[0].id;
  
        //Insert the vehicle's data into the vehicles table
        await db.query("INSERT INTO booked_vehicles (booking_id, make, model, year, num_plate) VALUES ($1, $2, $3, $4, $5)", [bookingId, make, model, year, num_plate]);
  
        // Insert the personal contact information into the bookings_contact_info table
        await db.query(
          "INSERT INTO bookings_contact_info (booking_id, first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4, $5)",
          [bookingId, first_name, last_name, email, full_phone_number]
        );
  
        // Set session flag for success submit
        req.session.booked = true;
        // Send confirmation email
        transporter.sendMail(mailOptions);
        // Redirect to booking page after success
        res.redirect("/book");
  
      } catch(err) {
        console.error("Error booking appointment:", err);
        //Set session flag for fail submit
        req.session.booked = false;
        // Redirect to booking page after failure
        res.redirect("/book");
      }
    } else {
      res.redirect("/login"); // Redirect to login if not authenticated
    }
  };



// Cancel Booking Route
export const cancelBooking = async (req, res) => {
    // Extract booking ID from request body
    const bookingId = req.body.booking_id;
    // Get user ID from authenticated session
    const userId = req.user.id;
  
    try{
      // Delete the booking from the database
      await db.query("DELETE FROM bookings WHERE id = $1 AND user_id = $2", [bookingId, userId]);
      
      // Redirect to the user's bookings page
      res.redirect("/myBookings");
    } catch (err) {
      console.error("Error cancelling boking:", err);
      res.status(500).send("Error cancelling your booking");
    }
  };



// Edit booking Route
export const editBooking = async (req, res) => {
    // Extract booking ID from query parameters
    const bookingId = req.query.booking_id;
  
    if (!bookingId) {
      // Return error if booking ID is missing
      return res.status(400).send("Booking ID is required");
    }
  
    try {
      // Fetch the booking details from the database
      const bookingResult = await db.query(
        `SELECT b.id, b.user_id, b.service_id, b.location, b.date, b.time, b.map_url, s.title AS service_title
         FROM bookings b
         JOIN services s ON b.service_id = s.id
         WHERE b.id = $1 AND b.user_id = $2`,
        [bookingId, req.user.id]
      );
      
      // Get booking details
      const booking = bookingResult.rows[0];
  
      if (!booking) {
        // Return error if booking not found
        return res.status(404).send("Booking not found");
      }
  
      // Convert UTC date to local time (YYYY-MM-DD format)
      const date = new Date(booking.date);
      // Adjust date to the local timezone
      const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
      const localDate = new Date(date.getTime() - offset).toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
  
      // Fetch the list of available services
      const servicesResult = await db.query("SELECT * FROM services");
      const services = servicesResult.rows;
  
     // Render the edit form with the booking and services details
     res.render("editBooking.ejs", {
      page: "editBooking",
      booking: {
        ...booking,
        date: localDate, // Pass booking details with adjusted date
      },
      services: services
    });
    } catch (err) {
      console.error("Error fetching booking for editing:", err);
      res.status(500).send("Eror retrieving your booking for editing");
    }
  };



 // Edit Booking Post
export const updateBooking = async (req, res) => {
    // Extract booking data from request body
    const {booking_id, service_id, date, time, full_address, map_url} = req.body;
  
    try {
      // Update booking data in the database
      await db.query("UPDATE bookings SET service_id = $1, date = $2, time = $3, location = $4, map_url = $5 WHERE id = $6 AND user_id = $7", [service_id, date, time, full_address, map_url, booking_id, req.user.id]);
  
      // Redirect to the user's bookings page after success
      res.redirect("/myBookings");
    } catch (err) {
      console.error("Error updating booking:", err);
      res.status(500).send("Error updating your booking");
    }
  };