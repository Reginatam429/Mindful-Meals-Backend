const Review = require('../models/Review');

// CREATE a new review
const createReview = async (req, res) => {
    const { restaurantId, comment, rating, customTags } = req.body;
    try {
        const newReview = await Review.create({
            user: req.user.userId,
            restaurant: restaurantId,
            comment: comment,
            rating: rating,
            customTags: customTags
        });
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create review' });
    }
};

// GET the review for a specific restaurant by the logged-in user
const getReviewByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const review = await Review.findOne({
            restaurant: restaurantId,
            user: req.user.userId
        });

        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch review' });
    }
};

// UPDATE a review
const editReview = async (req, res) => {
    const { reviewId } = req.params; // Use the reviewId from URL params
    const { comment, rating, customTags } = req.body;

    try {
        const updated = await Review.findOneAndUpdate(
            { _id: reviewId, user: req.user.userId }, // Match by reviewId
            { comment, rating, customTags },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Review not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update review' });
    }
};

// DELETE a review
const deleteReview = async (req, res) => {
    const { reviewId } = req.params; // Use the reviewId from URL params

    try {
        const deleted = await Review.findOneAndDelete({
            _id: reviewId,
            user: req.user.userId
        });

        if (!deleted) return res.status(404).json({ error: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

module.exports = {
    createReview,
    getReviewByRestaurant,
    editReview,
    deleteReview
};
