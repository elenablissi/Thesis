/*
Main app

@author Elena Blisi
*/


// Import the Express framework
import express from 'express';
// Import body-parser to handle request bodies
import bodyParser from 'body-parser';
// Import express-session for session management
import session from 'express-session';
// Import path for handling file and directory paths
import path from 'path';
// Import fileURLToPath for ES6 module URL conversion
import { fileURLToPath } from 'url';
// Import dirname to get the directory name
import { dirname } from 'path';
// Import dotenv for environment variables
import env from 'dotenv';
// Import passport for authentication
import passport from 'passport';

// Import route handlers
import indexRoutes from "./routes/indexRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import openingHoursRoutes from "./routes/openingHoursRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Import custom Passport setup
import './passport-setup.js';

// Create an Express application
const app = express();

// Handle __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url); // Convert module URL to file path
const __dirname = dirname(__filename); // Get the directory name of the current module

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory where views are located
app.set('views', path.join(__dirname, 'views'));

// Load environment variables from .env file
env.config();

// Define the port to listen on
const port = process.env.APP_PORT;
const url = process.env.FRONTEND_URL;

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 *60 *60 *1000 //Session cookie lasts for 1 day
    }
  })
);

// Configure body-parser middleware to handle URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to add authentication status and user info to response locals
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated(); // Check if user is authenticated
    res.locals.user = req.user || null; // Attach user info if authenticated
    next();
});

//Import and use Routes
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", bookingRoutes);
app.use("/", aboutRoutes);
app.use("/", contactRoutes);
app.use("/", openingHoursRoutes);
app.use("/", passwordRoutes);
app.use("/", servicesRoutes);
app.use("/", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log(`Accessible at: ${url}:${port}`);
});
  
