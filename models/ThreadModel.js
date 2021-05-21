let mongoose = require('mongoose');

let threadSchema = new mongoose.Schema({
    uniqueThreadId: String,
    users: [String],
    uniqueUserIds: [String],
    utcTime: Number,
    messages: [
        new mongoose.Schema({
            senderUniqueUserId: String,
            receiverUniqueUserId: String,
            senderUsername: String,
            receiverUsername: String,
            msg: String,
            dateString: String,
            utcTime: Number,
            uniqueMessageId: String,
        }),
    ],
},
{
    collection: 'threads',
});

let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread