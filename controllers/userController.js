const User = require('../models/UserModel');
const NotificationModel = require('../models/NotificationModel');
const { db } = require('../models/NotificationModel');
const Post = require('../models/PostModel');
const _ = require('underscore');

module.exports.controller = (app, uploads) => {
    //The Route Below Will Handle Creating A New User
    app.post('/createUser', uploads.single('avatar'), (req, res) => {
        try {
            let username = req.body.username //Get the username from the request object to make sure it is not taken.
            //Below we will use the User model to make sure the username is not taken.
            User.findOne({username: username}, (err, result) => {
                if(err) {
                    throw err;
                    console.log(err.message);
                    res.status(500).send('Error Validating Unique Username On Sign Up');
                }
                else {
                    if(result) {
                        res.status(200).send('username taken');
                    }
                    else {
                        //Now, Check Which Fields Are Optional And See If They Have Values 
                        let fraternity;
                        let sorority;
                        let twitterHandle;
                        let instagramHandle;
                        let youtubeChannel;
                        let sport;
                        let verifiedUser;
                        if(!req.body.fraternity) {
                            fraternity = '';
                        }
                        else {
                            fraternity = req.body.fraternity;
                        }
                        if(!req.body.sorority) {
                            sorority = '';
                        }
                        else {
                            sorority = req.body.sorority;
                        }
                        if(!req.body.twitterHandle) {
                            twitterHandle = '';
                        }
                        else {
                            twitterHandle = req.body.twitterHandle;
                        }
                        if(!req.body.instagramHandle) {
                            instagramHandle = '';
                        }
                        else {
                            instagramHandle = req.body.instagramHandle;
                        }
                        if(!req.body.youtubeChannel) {
                            youtubeChannel = '';
                        }
                        else {
                            youtubeChannel = req.body.youtubeChannel;
                        }
                        if(!req.body.sport) {
                            sport = '';
                            verifiedUser = false;
                        }
                        else {
                            sport = req.body.sport;
                            verifiedUser = true;
                        }
                        //Create Their First Notification Which Is A Welcome Message From Mixciti
                        let currentDate = new Date();
                        let hours = currentDate.getHours();
                        let minutes = currentDate.getMinutes();
                        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'];
                        let month = months[currentDate.getMonth()];
                        let date = currentDate.getDate();
                        let year = currentDate.getFullYear();
                        let amOrPm = (hours >= 12) ? 'pm' : 'am';
                        if(hours === 24) {
                            hours = 12;
                        }
                        else if(amOrPm === 'pm') {
                            hours = hours % 12;
                        }
                        if(minutes < 10) {
                            minutes = '0' + minutes;
                        }
                        if(hours === 0) {
                            hours = 12;
                        }
                        let signUpNotification = new NotificationModel({
                            senderUsername: 'Mixciti',
                            msg: 'Welcome to Mixciti!',
                            uniqueSenderId: '',
                            notificationType: 'welcomeMessage',
                            notificationDate: `${month} ${date} ${year}`,
                            notificationUtcTime: parseInt(Date.now()),
                            notificationLink: '#',
                            uniqueNotificationId: 'notification' + username + Date.now(),
                        });

                        //Below, create a new user model get all of the required fields so that we can add them to the User model.
                        let newUser = new User({
                            username: username,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            hometown: req.body.hometown,
                            homeState: req.body.homeState,
                            major: req.body.major,
                            schoolYear: req.body.schoolYear,
                            interests: req.body.interests,
                            sorority: sorority,
                            fraternity: fraternity,
                            twitterHandle: twitterHandle,
                            instagramHandle: instagramHandle,
                            youtubeChannel: youtubeChannel,
                            sport: sport,
                            bio: req.body.bio,
                            verifiedUser: verifiedUser,
                            avatar: req.file.filename,
                            uniqueUserId: 'user' + Date.now() + username,
                            profileTheme: req.body.profileTheme,
                            followers: [],
                            following: [],
                            notifications: [signUpNotification],
                            communities: [],
                            communitiesModerated: [],
                            karma: 0,
                            messageThreads: [],
                            events: [],
                            parties: [],
                            blockList: [],
                            dateCreated: `${month} ${date} ${year}`,
                        });

                        newUser.save((err, user) => {
                            if(err) {
                                throw err;
                                console.log(err.message);
                                res.status(500).send('There was an error saving the user in the database at newUser.save()');
                            }
                            else {
                                console.log(username, 'Just Signed Up For A Mixciti Account!');
                                res.status(200).json({result: 'success', user: user, posts: []});
                            }
                        });
                    }
                }
            });
        }
        catch(err) {
            console.log(err.message);
            res.status(500).send('There was an error saving the user in the database: ' + err.message);
        }
    });
    //-----------------------------------------------------------------------------------------------------------------------------------
    //The route below will handle authenticating the user on a log in attempt!
    app.post('/user-login', (req, res) => {
        //try and catch block. We should let the program die quietly on errors
        try {
            //Get the username and password from the login post request
            let username = req.body.username;
            let password = req.body.password;

            //Use the User model to look for a user with this username.
            User.findOne({username: username}, (err, user) => {
                if(err) {
                    console.log(err.message);
                    res.status(500).send('error');
                }
                else if(!user) {
                    console.log('User not found on log in attempt!');
                    res.status(200).json({auth: 'user not found'});
                }
                else {
                    if(user.password === password) {
                        console.log('User authenticated on log in attempt!');
                        //res.status(200).json({auth: 'user authenticated', user: user});
                        Post.find({uniqueUserId: user.uniqueUserId}, (err, userPosts) => {
                            console.log(`The User Posts Are ${userPosts}`);
                            if(err) {
                                console.log(err.message);
                                res.status(500).send('error');
                            }
                            else if(!userPosts) {
                                res.status(200).json({auth: 'user authenticated', user: user, userPosts: []});
                            }
                            else {
                                res.status(200).json({auth: 'user authenticated', user: user, userPosts: userPosts});
                            }
                        });
                    }
                    else {
                        console.log('Incorrect password on log in attempt!');
                        res.status(200).json({auth: 'invalid password'});
                    }
                }
            });
        }
        catch(err) {
            console.log(err.message);
            res.status(500).send('error');
        }
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    //The Route Below Will Send An Updated Version Of The User Back To The Server For Page Reloads.
    app.get('/get-current-user/:userid', (req, res) => {
        try {
            User.findOne({uniqueUserId: req.params.userid}, (err, user) => {
                if(err) {
                    res.status(500).send('Error In Get');
                }
                else {
                    //res.json({user: user});
                    Post.find({uniqueUserId: user.uniqueUserId}, (err, userPosts) => {
                        if(err) {
                            console.log(err.message);
                            res.status(500).send('error');
                        }
                        else if(!userPosts) {
                            res.json({user: user, userPosts: []});
                        }
                        else {
                            res.json({user: user, userPosts: userPosts});
                        }
                    });
                }
            });
        }catch(err) {
            console.log(err.message);
            res.status(500).send('error');
        }
    });
    //------------------------------------------------------------------------------------------------------------------------------------
    //The Route Below Will Help Us Get An Avatar Based On The Users' ID
    app.get('/api/user/avatar/:id', (req, res) => {
        let userId = req.params.id;
        try {
            User.findOne({uniqueUserId: userId}, (err, result) => {
                if(err) {
                    console.log(err.message);
                    res.status(500).send('Error Getting Image');
                }
                else {
                    gfs.files.findOne({ filename: result.avatar }, (err, file) => {
                        // Check if file
                        if (!file || file.length === 0) {
                            console.log('\n\n\nOpppppps. We could not find that file');
                            db.close();
                        return res.status(404).json({
                            err: 'No file exists'
                        });
                        }
                        else {
                            let readstream = gfs.createReadStream(file.filename);
                            db.close();
                            readstream.pipe(res);
                        }
                    });
                }
            });
        }catch(err) {
            console.log(err.message);
            res.status(500).send('error');
        }
    });
}
