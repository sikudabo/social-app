const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    title: String,
    src: String,
    description: String,
    uniqueUserId: String,
    username: String,
    attending: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
    dateString: String,
    topics: [String],
    likes: [
        new mongoose.Schema({
            username: String,
            uniqueUserId: String,
        }),
    ],
    utcTime: Number,
    utcTimeCreated: Number,
    uniqueEventId: String,
},
{
    collection: 'events',
});

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;