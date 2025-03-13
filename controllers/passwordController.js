/*
Controller functions for handling 
password related routes

@author Elena Blisi
*/

// Import database connection
import db from '../config/database.js';
// Import bcrypt for hashing passwords
import bcrypt from 'bcrypt';
// Import crypto for generating secure tokens
import crypto from 'crypto';
// Import nodemailer for sending emails
import nodemailer from 'nodemailer';

const URL_PATH = `${process.env.FRONTEND_URL}:${process.env.APP_PORT}`;


// GET FORGOT PASS PAGE
export const getForgotPasswordPage = (req, res) => {
    const source = req.query.source;

    // Initialize session status if not already set
    if (typeof req.session.status === 'undefined') {
      req.session.status = "";
    }
  
    // Save and reset error flag for next use
    const status = req.session.status;
    req.session.status = "";
    
    // Render the forgot password page if accessed from the login page
    if(source === 'login') {
      res.render("forgotPass.ejs", { page: 'forgotPass', status });
    } else {
      res.redirect("/login"); // Redirect if not accessed from the login page
    }
  };



// Handle forgot password
export const postForgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
      // Generate a unique reset token and set expiration time
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // Expires 15 minutes from now

      //Update user record with reset token and expiration
      const userQuery = 'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3 RETURNING *';
      const userResult = await db.query(userQuery, [resetToken, resetTokenExpires, email]);

      // If no user was found with the provided email, set error status and redirect
      if(userResult.rows.length === 0) {
        req.session.status = "error";
        return res.redirect("/forgotPass?source=login");
      }

      // Send reset email 
      const transporter = nodemailer.createTransport ( {
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER, // Admin email
          pass: process.env.EMAIL_PASS // Admin email password
        }
      });

      //Email options and structure for reset password email
      const mailOptions = {
        from: process.env.EMAIL_USER, // Admin email as the sender
        to: email, // Recipient email
        subject: "Password Reset Request",
        html: `<p>You requested a password reset. The link will expire in 15 minutes. To reset your password click <a href="${URL_PATH}/reset-password/${resetToken}">here</a>.</p>`
    };

    // Send the reset password email
    await transporter.sendMail(mailOptions);
    req.session.status = "OK"; // Set success status
    return res.redirect("/forgotPass?source=login"); // Redirect after sending email
  } catch (error) {
    console.error(error);
    req.session.status = "fail"; // Set failure status
    return res.redirect("/forgotPass?source=login"); // Redirect after error
  }
};


// Get reset token and reset password page
export const getResetPasswordPage = async (req, res) => {
    const { token } = req.params;
  
    try {
      // Check if the reset token is valid and not expired
      const userQuery = 'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()';
      const userResult = await db.query(userQuery, [token]);
      
      // Initialize/reset session flag for password reset completion
      if (typeof req.session.resetDone === 'undefined' ) req.session.resetDone = false;
      
      // If the password reset was completed, show a success message
      if (req.session.resetDone) {
        // Reset flag
        req.session.resetDone = false ;
        res.render("resetPass.ejs", { page: 'resetPass', valid: true, submitted: true , token: null });
        return;
      }
  
      // Link/Token is not valid / expired
      if (userResult.rows.length === 0) {
        res.render("resetPass.ejs", { page: 'resetPass', valid: false, submitted: false , token: null });
        return;
      }
  
      // Render password reset form if valid token
      res.render("resetPass.ejs", { page: 'resetPass', valid: true, submitted: false , token });
    } catch (error) {
      console.error(error);
      // Render error page
      res.render("resetPass.ejs", { page: 'resetPass', valid: false, submitted: false , token: null });
    }
  };


// Handle Password Reset
export const postResetPassword = async (req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  
  try {
    // Query the database to validate the reset token and check expiration
    const userQuery = 'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()';
    const userResult = await db.query(userQuery, [token]);

    // If the token is invalid or expired, send an error response
    if(userResult.rows.length === 0) {
      return res.status(400).send("Password reset link is invalid or has expired");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS); // Number of salt rounds for bcrypt
    const user = userResult.rows[0]; // Get the user data
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the new password

    //Update the user's password and clear reset token
    await db.query ("UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2",
    [hashedPassword, user.id]);

    req.session.resetDone = true; // Set reset completion flag
    res.redirect("/reset-password/:token"); // Redirect after successful reset
  } catch (error) {
      console.error("Error resetting password", error); // Log any errors
      req.session.resetDone = false; // Set failure flag
      res.status(500).send("Error resetting password"); // Send error response
  }
};
    