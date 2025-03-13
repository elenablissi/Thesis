/*
Contact from routes

@author Elena Blisi
*/

// Import the express module for routing
import express from 'express';
// Import contact form related functions from contact controller
import { getContactPage, postContactForm } from '../controllers/contactController.js';

// Create a new router object
const router = express.Router();

router.get("/contact", getContactPage); // Route to render the contact page
router.post("/contact", postContactForm); // Route to handle contact form submissions

// Export the router object for use in the main application
export default router;