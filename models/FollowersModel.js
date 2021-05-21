const mongoose = require('mongoose');

let FollowersSchema = new mongoose.Schema({
    username: String,
    uniqueUserId: String,
});

let Follower = new mongoose.model('Follower', FollowersSchema);

module.exports = Follower;