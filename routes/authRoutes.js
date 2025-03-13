/*
authentication (login, register, logout) routes

@author Elena Blisi
*/


// Import the express module for routing
import express from "express";
// Import all functions from authController
import { getLogin, postLogin, getRegister, postRegister, logout, googleAuth, googleCallback, getAuthStatus } from "../controllers/authController.js";

// Create a new router object
const router = express.Router();

router.get('/login', getLogin); // Route to render the login page
router.post('/login', postLogin); // Route to handle login form submissions
router.get('/register', getRegister); // Route to render the registration page
router.post('/register', postRegister); // Route to handle registration form submissions
router.get('/logout', logout); // Route to handle user logout
router.get('/auth/google', googleAuth); // Route to initiate Google authentication
router.get('/auth/google/myBookings', googleCallback); // Route for Google authentication callback
router.get('/api/auth/status', getAuthStatus); // Route to check the current authentication status of the user

// Export the router object for use in the main application
export default router;