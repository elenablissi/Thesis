/*
Book / bookings related routes

@author Elena Blisi
*/


// Import the express module for routing
import express from 'express';
// Import all related functions from booking controller
import { getBookingPage, postBooking, cancelBooking, editBooking, updateBooking, availability } from '../controllers/bookingController.js';
// Import middleware for authentication check
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';

// Create a new router object
const router = express.Router();

router.get('/book', getBookingPage); // Route to render the booking page
router.post('/book', postBooking); // Route to handle booking form submissions
router.post('/cancelBooking', ensureAuthenticated, cancelBooking); // Route to cancel an existing booking (requires authentication)
router.get('/editBooking', ensureAuthenticated, editBooking); // Route to render the booking edit page (requires authentication)
router.post('/updateBooking', ensureAuthenticated, updateBooking); // Route to handle booking updates (requires authentication)
router.get('/available-times', availability); // Route to check available times for bookings

// Export the router object for use in the main application
export default router;