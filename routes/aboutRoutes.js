/*
About page route

@author Elena Blisi
*/


// Import the express module for routing
import express from "express";
// Import the about controller function
import { about } from "../controllers/aboutController.js";

// Create a new router object
const router = express.Router();

// Define a route for the GET request to "/about" and link it to the about controller
router.get("/about", about);


// Export the router object so it can be used in other parts of the application
export default router;