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
router.get('/:restaurantId', verifyToken, getReviewByRestaurant);
router.put('/:restaurantId', verifyToken, editReview);
router.delete('/:restaurantId', verifyToken, deleteReview);

module.exports = router;
