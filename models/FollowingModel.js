const mongoose = require('mongoose');

let FollowingSchema = new mongoose.Schema({
    username: String,
    uniqueUserId: String,
});

let Following = mongoose.model('Following', FollowingSchema);

module.exports = Following;