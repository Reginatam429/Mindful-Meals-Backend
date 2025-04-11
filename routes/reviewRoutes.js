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
router.get('/', verifyToken, getReviewByRestaurant);
router.post('/', verifyToken, createReview);
router.put('/:reviewId', verifyToken, editReview);
router.delete('/:reviewId', verifyToken, deleteReview);

module.exports = router;
