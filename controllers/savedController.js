const SavedRestaurant = require('../models/SavedRestaurant');

// GET all saved restaurants for current user
const getSavedRestaurants = async (req, res) => {
    try {
        const restaurants = await SavedRestaurant.find({ user: req.user.userId });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved restaurants' });
    }
};

// POST a new saved restaurant
const saveRestaurant = async (req, res) => {
    const { yelpId, name, address, imageUrl, rating, categories } = req.body;
    try {
        const newRestaurant = await SavedRestaurant.create({
        yelpId,
        name,
        address,
        imageUrl,
        rating,
        categories,
        user: req.user.userId
        });

        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save restaurant' });
    }
};

// DELETE a saved restaurant by ID
const deleteSavedRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await SavedRestaurant.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Restaurant not found or not authorized' });
        }

        res.json({ message: 'Restaurant removed' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
};

module.exports = {
    getSavedRestaurants,
    saveRestaurant,
    deleteSavedRestaurant
};
