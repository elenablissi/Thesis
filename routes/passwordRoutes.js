/*
Password related routes

@author Elena Blisi
*/

// Import the express module for routing
import express from "express";
// Import all functions from password controller
import { getForgotPasswordPage, postForgotPassword, getResetPasswordPage, postResetPassword } from "../controllers/passwordController.js";

// Create a new router object
const router = express.Router();

router.get("/forgotPass", getForgotPasswordPage); // Route to get the "Forgot Password" page
router.post("/forgot-Password", postForgotPassword); // Route to handle form submission for forgot password
router.get("/reset-password/:token", getResetPasswordPage); // Route to get the "Reset Password" page with a token parameter
router.post("/reset-password/:token", postResetPassword); // Route to handle form submission for resetting the password with a token parameter

// Export the router object for use in the main application
export default router;