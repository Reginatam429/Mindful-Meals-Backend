const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
    createReview,
    getReviewByRestaurant,
    editReview,
    deleteReview
} = require('../controllers/reviewController');

// Protect all routes
router.post('/', verifyToken, createReview);
router.get('/restaurant/:restaurantId', verifyToken, getReviewByRestaurant);
router.put('/restaurant/:restaurantId', verifyToken, editReview);
router.delete('/:reviewId', verifyToken, deleteReview);

module.exports = router;
