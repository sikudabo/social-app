const mongoose = require('mongoose');

let NotificationSchema = new mongoose.Schema({
    senderUsername: String,
    msg: String,
    uniqueSenderId: String,
    notificationType: String,
    notificationDate: String,
    notificationUtcTime: Number,
    notification: String,
    uniqueNotificationId: String,
    link: String,
});

let Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;