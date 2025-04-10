const SavedRestaurant = require('../models/SavedRestaurant');
const User = require('../models/User');

// GET all saved restaurants for current user
const getSavedRestaurants = async (req, res) => {
    try {
        const restaurants = await SavedRestaurant.find({ user: req.user._id });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved restaurants' });
    }
};

// POST a new saved restaurant
const saveRestaurant = async (req, res) => {
    try {
        const { yelpId, name, address, imageUrl, rating, categories } = req.body;

        // Prevent duplicate saves
        const alreadySaved = await SavedRestaurant.findOne({ yelpId, user: req.user._id });
        if (alreadySaved) {
        return res.status(200).json(alreadySaved);
        }

        // Create new saved restaurant
        const newFavorite = await SavedRestaurant.create({
        yelpId,
        name,
        address,
        imageUrl,
        rating,
        categories,
        user: req.user._id
        });

        // Update user's savedRestaurants array
        await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { savedRestaurants: newFavorite._id } }
        );

        res.status(201).json(newFavorite);
    } catch (error) {
        console.error('Error saving restaurant:', error);
        res.status(500).json({ error: 'Failed to save restaurant' });
    }
};

// DELETE a saved restaurant by ID
const deleteSavedRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await SavedRestaurant.findOneAndDelete({
        _id: id,
        user: req.user._id
        });

        if (!deleted) {
        return res.status(404).json({ error: 'Restaurant not found or not authorized' });
        }

        // Optional: remove reference from user doc
        await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { savedRestaurants: id } }
        );

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
