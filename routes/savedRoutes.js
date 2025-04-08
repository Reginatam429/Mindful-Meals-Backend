const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
    getSavedRestaurants,
    saveRestaurant,
    deleteSavedRestaurant
} = require('../controllers/savedController');

// Protected Routes
router.get('/', verifyToken, getSavedRestaurants);
router.post('/', verifyToken, saveRestaurant);
router.delete('/:id', verifyToken, deleteSavedRestaurant);

module.exports = router;
