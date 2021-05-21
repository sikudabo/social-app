const Post = require('../models/PostModel');
const User = require('./userController');

module.exports.postsController = (app, uploads) => {
    app.post('/api/post/upload', (req, res) => {
        let title;
        let community;
        let link;
        let src;

        if(req.body.title) {
            title = req.body.title;
        }
        else {
            title = '';
        }
        if(req.body.community) {
            community = req.body.community;
        }
        else {
            community = '';
        }
        if(req.body.link) {
            link = req.body.link;
        }
        else {
            link = '';
        }
        if(req.body.src) {
            src = req.body.src;
        }
        else {
            src = '';
        }
        let newPost = new Post({
            text: req.body.text,
            uniqueUserId: req.body.uniqueUserId,
            username: req.body.username,
            dateString: req.body.dateString,
            uniquePostId: req.body.username + Date.now() + req.body.uniqueUserId + 'post',
            context: req.body.context,
            type: req.body.type,
            utcTime: req.body.utcTime,
            title: title,
            community: community,
            link: link,
            comments: [],
            likes: [],
            src: src,
        });
        newPost.save((err, result) => {
            if(err) {
                console.log(err.message);
                res.status(500).send('Error Uploading Post');
            }
            else {
                console.log('A User Successfully Uploaded A', req.body.type, 'Post!');
                res.status(200).json({completion: 'success', newPost: result});
            }
        });
    });
}