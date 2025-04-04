const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedRestaurant' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
