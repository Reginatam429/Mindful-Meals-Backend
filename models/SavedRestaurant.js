const mongoose = require('mongoose');

const savedRestaurantSchema = new mongoose.Schema({
    yelpId:    { type: String, required: true },
    name:      String,
    address:   String,
    imageUrl:  String,
    rating:    Number,
    categories: [String],
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('SavedRestaurant', savedRestaurantSchema);
