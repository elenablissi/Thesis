/*
Opening Hours page route

@author Elena Blisi
*/

// Import the express module for routing
import express from "express";
// Import the openingHours function from the controller
import { openingHours } from "../controllers/openingHoursController.js";

// Create a new router object
const router = express.Router();

router.get("/openingHours", openingHours); // Route to get opening hours information

// Export the router object for use in the main application
export default router;