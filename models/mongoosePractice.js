const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/practice';

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

let messageSchema = new mongoose.Schema({
    sender: String,
    postDate: {type: Date, default: Date.now()},
});

let testerSchema = mongoose.Schema({
    name: String,
    password: String,
    mixedUp: {},
    age: Number,
    friends: [],
    messages: [new mongoose.Schema({
        sender: String,
        postDate: {type: Date, default: Date.now()},
    })],
}, {
    collection: 'myTest',
});

let testerModel = mongoose.model('testerModel', testerSchema);

testerModel.findOne({name: 'Carson'}, (err, result) => {
    if(err) {
        console.log(err.message);
        mongoose.connection.close();
    }
    else {
        let id = "5f3fa4d20b75c13f8c5581cf";
        result.messages.id(id).remove();
        result.save((err, user) => {
            if(err) {
                console.log(err.message);
                mongoose.connection.close();
            }
            else {
                console.log(user.messages);
                console.log('Message Deleted');
                mongoose.connection.close();
            }
        });
    }
});




