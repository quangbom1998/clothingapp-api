const express = require('express');
const router = express.Router();
const data = require('../data.json');
const fs = require('fs');

// // Get all users
// router.get('/', (req,res) => {
//     console.log(data.user);
//     res.status(200).send(data.user);
// });

// // Get user by user_id
// router.get('/:user_id', (req,res) => {
//     var userID = req.params.user_id;
//     fs.readFile('data.json', function(err, data){
//         if (err){
//             console.log(err);
//         } 
//         else 
//         {
//             // Convert data from string to object
//             var userObj = JSON.parse(data);

//             // Find user with matched user_id
//             var getUser = userObj.user.find((user) => user.user_id == userID)
            
//             if (!getUser) {
//                 res.status(500).send('User not found');
//             }
//             else 
//             {
//                 console.log('User found', getUser);
//                 res.status(200).send(getUser);
//             }
//         }
//     });    
// });

var user_id = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// User register
router.post('/register', (req,res) => {
    console.log(req.body);

    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var userObj = JSON.parse(data); 

            // Add object's properties
            userObj.user.push({
                user_id: user_id(),
                full_name: req.body.full_name,
                username: req.body.username,
                password: req.body.password,
                isadmin: false,
                //type_login: req.body.type_login,
                created_at: Date.now()
            }); 
            
            // Convert it back to string
            var strUser = JSON.stringify(userObj, null, 4); 

            // Write to users.json
            fs.writeFile('data.json', strUser, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('User added');
                    res.status(200).send('User added');
                }
            });
    }});
});

// User login
router.post('/login', (req,res) => {
    console.log(req.body);

    var userName = req.body.username;
    var passWord = req.body.password;

    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var userObj = JSON.parse(data);

            // Add user info with matched user_id
            var getUser = userObj.user.find((user) => user.username == userName && user.password == passWord);
            
            if (!getUser) {
                res.status(500).send('User not found');
            }
            else 
            {
                console.log('Welcom ' + getUser.full_name);
                res.status(200).send('Welcom ' + getUser.full_name);
            }
    }});
    
});

// User changes password
router.post('/:user_id/password', (req,res) => {
    console.log(req.body);
    var userID = req.params.user_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var userObj = JSON.parse(data);

            // Add user info with matched user_id
            userObj.user.find((user) => user.user_id == userID).password = req.body.password;
            
            // Convert it back to string
            var strUser = JSON.stringify(userObj, null, 4); 

            // Write to users.json
            fs.writeFile('data.json', strUser, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('New Password Saved');
                    res.status(200).send('New Password Saved');
                }
            });
    }});
});

// User info update
router.post('/:user_id/info', (req,res) => {
    console.log(req.body);
    var userID = req.params.user_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var userObj = JSON.parse(data);

            // Add user info with matched user_id
            userObj.user.find((user) => user.user_id == userID).phone_number = req.body.phone_number;
            userObj.user.find((user) => user.user_id == userID).dob = req.body.dob;
            userObj.user.find((user) => user.user_id == userID).gender = req.body.gender;
            userObj.user.find((user) => user.user_id == userID).address = req.body.address;
            userObj.user.find((user) => user.user_id == userID).email = req.body.email;
            
            // Convert it back to string
            var strUser = JSON.stringify(userObj, null, 4); 

            // Write to users.json
            fs.writeFile('data.json', strUser, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Saved');
                    res.status(200).send('Saved');
                }
            });
    }});
});

// // Delete user
// router.delete('/:user_id', (req,res) => {
//     var userID = req.params.user_id;
//     fs.readFile('data.json', function(err, data){
//         if (err){
//             console.log(err);
//         } 
//         else 
//         {
//             // Convert data from string to object
//             var userObj = JSON.parse(data);
            
//             var u = userObj.user;

//             // Filter the user who has user_id different to UserID and save to userObj
//             userObj.user = u.filter((user) => {
//                 return user.user_id !== userID;
//             });

//             // Convert it back to string
//             var strUser = JSON.stringify(userObj, null, 4);

//             fs.writeFile('data.json', strUser, function(err){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('user ' + userID + ' deleted');
//                 }
//             });
//             res.status(200).send('user ' + userID + ' deleted');
//         }
//     });
// });

module.exports = router;