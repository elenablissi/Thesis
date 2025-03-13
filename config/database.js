/* 
PostgreSQL Database Connection

@author Elena Blisi
*/

// Importing the 'pg' module for PostgreSQL client
import pg from "pg";
// Importing the 'dotenv' for environment variables management
import env from "dotenv";

// Load environment variables from the .env file
env.config();

// Creating a new PostgreSQL client
const db = new pg.Client( {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
} );

// Connect to the PostgreSQL database
db.connect().catch(err => {
    // Console Log any connection errors
    console.error('Database connection error:', err.stack);
});

// Export the database client for use in other parts of the application
export default db;