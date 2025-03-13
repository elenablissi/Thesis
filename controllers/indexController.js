/*
Controller function for handling 
Home page route

@author Elena Blisi
*/

// Import Axios for making HTTP requests (for google reviews)
import axios from 'axios';

export const homePage = async (req, res) => {
    // Google API key & place id
    const API_KEY = process.env.GOOGLE_API_KEY;
    const placeId = process.env.PLACE_ID; 
  
    try {
      // Fetch place details from Google Places API
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: placeId,
          key: API_KEY,
          fields: 'reviews'
        }
      });
      
      if (response.data.result && response.data.result.reviews) {
        // Map the reviews to include profile photo URLs if available
        const reviews = response.data.result.reviews.map(review => ({
          author_name: review.author_name,
          rating: review.rating,
          text: review.text,
          profile_photo_url: review.profile_photo_url,
          time : review.relative_time_description
        }));
  
        // Render the EJS template with the reviews
        res.render("index.ejs", { page: 'home', reviews });
      } else {
        // If no reviews are available, pass null to the template
        const reviews = null;
        res.render("index.ejs", { page: 'home', reviews });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).send('Error retrieving reviews');
    }
  };