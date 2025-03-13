/*
Controller function for handling 
services related route

@author Elena Blisi
*/

// Import the database connection
import db from "../config/database.js"; 

// Get services page
export const services = async (req,res) => {
    try {
      // Get all services, ordered by ID in ascending order from the database
      const servicesResult = await db.query("SELECT * from services ORDER BY id ASC");
      // Extract the rows from the result
      const services = servicesResult.rows; 

      // Get all benefits from the benefits table
      const benefitsResult = await db.query("SELECT * from benefits");
      // Extract the rows from the result
      const benefits = benefitsResult.rows;

      // Render the services page, passing the fetched services and benefits to the template
      res.render("services.ejs", { page: 'services', services , benefits}); 
    } catch (err) {
      // Log any errors that occur during the query execution
      console.error("Error fetching services:", err);
      // Send a 500 status code and an error message if an error occurs
      res.status(500).send("Error fetching services.");
    }
      
  };