const mongoose = require('mongoose');

let communitySchema = new mongoose.Schema({
    name: String,
    title: String,
    topics: [String],
    communityTheme: String,
    avatar: String,
    moderator: new mongoose.Schema({
        username: String,
        uniqueUserId: String,
    }),
    ratings: [Number],
    rating: Number,
    rules: [String],
    chatRoom: new mongoose.Schema({
        name: String,
        community: String,
        title: String,
        messages: [
            new mongoose.Schema({
                username: String,
                uniqueUserId: String,
                utcTime: String,
                dateString: String, 
                uniqueMessageId: String,
                community: String,
                room: String,
                text: String,
            }),
        ],
    }),
    blockList: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
    members: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
}, 
{
    collection: 'communities',
});

let Community = mongoose.model('Community', communitySchema);

module.exports = Community;