const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const authRoutes = require('./routes/authRoutes.js');
const savedRoutes = require('./routes/savedRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes');
const yelpRoutes = require('./server/routes/yelp.js');

const app = express();
const YELP_API_KEY = process.env.YELP_API_KEY;

// ✅ Middleware
// Determine the origin based on the environment
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? 'https://mindful-meals.netlify.app/' //Netlify URL
  : 'http://localhost:5173'; // Local development URL

app.use(cors({
    origin: allowedOrigins, // dynamically set the origin based on environment
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/yelp', yelpRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Mindful Meals backend is live!');
});

app.get('/api/search', async (req, res) => {
    const { term, location } = req.query;
    console.log(`Search request received: term=${term}, location=${location}`);

    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
        },
        params: {
            term,
            location,
            limit: 10,
        },
        });

        res.json(response.data.businesses);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data from Yelp API' });
    }
});

// ✅ MongoDB connection + start server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection failed:", err));
