const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const yelpRoutes = require('./server/routes/yelp.js');
import axios from 'axios';

const app = express();
const YELP_API_KEY = process.env.YELP_API_KEY;
const authRoutes = require('./routes/authRoutes');
const savedRoutes = require('./routes/savedRoutes');


// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use(express.urlencoded({ extended: true })); 

app.get('/api/search', async (req, res) => {
    console.log(`Search request received: term=${term}, location=${location}`);

    const { term, location } = req.query;

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

// Test route
app.get('/', (req, res) => {
    res.send('Mindful Meals backend is live!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection failed:", err));
