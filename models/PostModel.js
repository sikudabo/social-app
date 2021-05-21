const mongoose = require('mongoose');
//We Are Going To Make The Link Summary A Field Called "text" Instead To Simplify Things.

const postSchema = new mongoose.Schema({
    uniquePostId: String,
    uniqueUserId: String,
    username: String,
    utcTime: Number,
    likes: [
        new mongoose.Schema({
            uniqueUserId: String,
            username: String,
        })
    ],
    comments: [
        new mongoose.Schema({
            uniqueCommentId: String,
            uniqueUserId: String,
            username: String,
            dateString: String,
            text: String,
            utcTime: Number,
            likes: [String],
        })
    ],
    dateString: String,
    src: {
        type: String,
        default: '',
    },
    type: String,
    context: String,
    text: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    caption: {
        type: String,
        default: '',
    },
    community: {
        type: String,
        default: '',
    },
},
{
    collection: 'posts',
});

let PostModel = mongoose.model('PostModel', postSchema);

module.exports = PostModel;