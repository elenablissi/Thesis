/*
Home page route

@author Elena Blisi
*/


// Import the express module for routing
import express from "express";
// Import home page function from index controller
import { homePage } from "../controllers/indexController.js";

// Create a new router object
const router = express.Router();

router.get("/", homePage); // Route to render the home page

// Export the router object for use in the main application
export default router;