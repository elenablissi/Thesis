/*
Passport Setup 
for authentication

@author Elena Blisi
*/


// Import passport for authentication
import passport from 'passport';
// Import local strategy for username/password authentication
import { Strategy } from 'passport-local';
// Import Google OAuth2 strategy for Google authentication
import GoogleStrategy from 'passport-google-oauth2';
// Import bcrypt for password hashing and comparison
import bcrypt from 'bcrypt';
// Import database connection
import db from './config/database.js';

// Define the port for google OAuth callback URL
const port = process.env.APP_PORT;
const url = process.env.FRONTEND_URL;

// Configure the local strategy for Passport
passport.use(new Strategy({
    usernameField: 'email',   // Field name for username (email) in the login form
    passwordField: 'password' // Field name for password in the login form
  },
  async (email, password, done) => {
    try {
      // Query the database for the user by email
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (result.rows.length > 0) { // Check if the user exists
        const user = result.rows[0]; // Get user data
        const storedHashedPassword = user.password; // Get stored hashed password

        // Compare provided password with stored hashed password
        bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
          if (err) {
            console.error("Error comparing passwords:", err); // Log error
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid credentials! The email and password you provided don't match!" });
          }
        });
      } else {
        return done(null, false, { message: 'User not found!' });
      }
    } catch (err) {
      console.error("Database error:", err);
      return done(err);
    }
  }
));

// Configure the Google OAuth2 strategy for Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${url}:${port}/auth/google/myBookings`,
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      // Query the database for the user by email from Google profile
      const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
      
      if (result.rows.length === 0) {
        // If user does not exist, create a new user
        const newUser = await db.query(
          "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [profile.given_name, profile.family_name, profile.email, "google"]
        );
        return done(null, newUser.rows[0]);
      } else {
        // If user exists, log them in
        return done(null, result.rows[0]);
      }
    } catch (err) {
      console.error('Error authenticating with Google:', err);
      return done(err);
    }
  }
));

// Serialize user information to store in session
passport.serializeUser((user, cb) => {
  cb(null, user); // Store user object in session
});

// Deserialize user information from session
passport.deserializeUser((user, cb) => {
  cb(null, user); // Retrieve user object from session
}); 