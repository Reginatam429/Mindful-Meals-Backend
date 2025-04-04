const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'SavedRestaurant', required: true },
    customTags: [String],
    comment:    String,
    rating:     Number
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
