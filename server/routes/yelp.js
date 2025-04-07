//server/routes/yelp.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const YELP_API_KEY = process.env.YELP_API_KEY;

// Yelp API search endpoint
router.get('/search', async (req, res) => {
  try {
    const { term, location } = req.query;
    if (!term || !location) {
        return res.status(400).json({ 
          error: 'Both term and location parameters are required' 
        });
      }
  
      // Decode URI components
      const decodedTerm = decodeURIComponent(term);
      const decodedLocation = decodeURIComponent(location);
    
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      params: {
        term: `${term} restaurants`,
        location,
        categories: 'restaurants',
        attributes: 'restaurants_price_range_2,restaurants_delivery,restaurants_reservation',
        sort_by: 'rating',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    });
    const allergyFriendlyCategories = ['gluten_free', 'vegan', 'vegetarian', 'halal', 'kosher'];
    const filteredBusinesses = response.data.businesses.filter(business => {
      return business.categories.some(cat => allergyFriendlyCategories.includes(cat.alias));
    });

    res.json(filteredBusinesses);
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