//server/routes/yelp.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const YELP_API_KEY = process.env.VITE_YELP_API_KEY;


// Yelp API search endpoint
router.get('/search', async (req, res) => {
  try {
    const { term, location, category } = req.query;
    if (!term || !location) {
      return res.status(400).json({ 
        error: 'Both term and location parameters are required' 
      });
    }

    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      params: {
        term,
        location,
        categories: category || 'restaurants',
        sort_by: 'rating',
        limit: 15
      },
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    });

    // Filter businesses with coordinates missing
    const businessesWithCoordinates = response.data.businesses.filter(business => business.coordinates);

    res.json({ businesses: businessesWithCoordinates }); // ✅ send businesses with valid coordinates
  } catch (error) {
    console.error('Yelp API error:', error);
    res.status(500).json({ error: 'Failed to fetch Yelp data' });
  }
});



// Business details endpoint (for map)
router.get('/business/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Yelp business details error:', error);
    res.status(500).json({ error: 'Failed to fetch business details' });
  }
});

module.exports = router;