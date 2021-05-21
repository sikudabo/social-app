const mongoose = require('mongoose');
const FollowersModel = require('./FollowersModel');
const FollowingModel = require('./FollowingModel');
const NotificationModel = require('./NotificationModel');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    hometown: String,
    homeState: String,
    major: String,
    schoolYear: String,
    interests: [String],
    fraternity: String,
    sorority: String,
    twitterHandle: String,
    instagramHandle: String,
    youtubeChannel: String,
    sport: String,
    avatar: String,
    profileTheme: String,
    followers: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
    following: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
    communities: [String],
    communitiesModerating: [String],
    karma: Number,
    messageThreads: [],
    events: [],
    parties: [],
    blockList: [String],
    verifiedUser: [Boolean],
    uniqueUserId: String,
    dateCreated: String,
    communities: [],
    communitiesModerated: [],
    notifications: [
        new mongoose.Schema({
            type: String,
            uniqueUserId: String, 
            username: String, 
            dateString: String,
            utcTime: Number,
            text: String,
            link: String,
            uniqueNotificationId: String,
        })
    ],
    bio: String,
}, {
    collection: 'users',
});

let User = mongoose.model('User', userSchema);

module.exports = User;