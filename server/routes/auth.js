const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Validator = require("validator"); 
const isEmpty = require('is-empty');
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");



// Load User model
const User = mongoose.model('User');

router.post('/signup', (req, res) => {
    //Do stuff, interact with database to input users to database


    if(!Validator.isLength(req.body.password,{min:6,max:30})){
        return res.status(400).json({ msg: "Password must be atleast 6 characters" });
    }
    
    if(!Validator.equals(req.body.password,req.body.password2)){
        return res.status(400).json({ msg: "Passwords must match" });
    }
  
    User.findOne({username:req.body.username}).then(user=>{

        if(user){
            return res.status(400).json({msg:"Username already exists"});
        } else{
            const newUser = new User({
                username:req.body.username,
                password:req.body.password,
            });    
               
            // Hash password before storing in database
            const rounds  = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = {
                                    id: user._id,
                                    name: user.username
                                };
            
                                // Sign token
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    {
                                        expiresIn: 31556926 
                                    },
                                    (err,token) => {
                                        res.json({
                                            success: true,
                                            token: token
                                        });
                                    }
                                );
                            })
                            .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username}).then(user=>{
        if(!user){
            return res.status(400).json({ msg: "Username or Password is incorrect" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.username
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 
                    },
                    (err,token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            }
            else{
                return res.status(400).json({ msg: "Username or password is incorrect" });
            }
        });
    });
});


module.exports = router;