/*
Middleware functions for handling 
user authentication

@author Elena Blisi
*/


//Middleware for authentication
function ensureAuthenticated(req, res, next) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // If authenticated, proceed to the next middleware or route handler
        return next();
    } else {
        // If not authenticated, redirect to the login page
        res.redirect("/login");
    }
  }
  
  //Middleware for admin user check
  function ensureAdmin(req, res, next) {
    // Check if the user is authenticated and has admin privileges
    if (req.isAuthenticated() && req.user.is_admin) {
      // If authenticated and is admin, proceed to the next middleware or route handler
      return next();
    } else {
      // If not authenticated or not an admin, redirect to the user's bookings page
      res.redirect("/myBookings");
    }
  }
  
  // Export the middleware functions for use in other parts of the application
  export { ensureAuthenticated, ensureAdmin };