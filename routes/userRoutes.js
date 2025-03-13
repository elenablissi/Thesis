/*
User account related routes

@author Elena Blisi
*/

// Import the express module for routing
import express from "express";
// Import all functions from user controller
import { getUserAccount, getMyBookings, getAccountSettings, updatePersonalDetails, getAdminDashboard } from "../controllers/userController.js";
// Import middleware for authentication and authorization
import { ensureAdmin, ensureAuthenticated } from '../middlewares/authMiddleware.js';

// Create a new router object
const router = express.Router();

router.get("/account", ensureAuthenticated, getUserAccount); // Route to get the user's account
router.get("/myBookings", ensureAuthenticated, getMyBookings); // Route to get the user's bookings
router.get("/accountSettings", ensureAuthenticated, getAccountSettings); // Route to get account settings
router.post("/accountSettings", ensureAuthenticated, updatePersonalDetails); // Route to update account settings
router.get("/adminDashboard", ensureAdmin, ensureAuthenticated, getAdminDashboard); // Route to get the admin dashboard (requires admin role and authentication)

// Export the router object for use in the main application
export default router;