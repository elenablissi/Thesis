/*
Services related routes

@author Elena Blisi
*/


// Import the express module for routing
import express from "express";
// Import services function from services controller
import { services } from "../controllers/servicesController.js";

// Create a new router object
const router = express.Router();

router.get("/services", services); // Route to get the services page

// Export the router object for use in the main application
export default router;