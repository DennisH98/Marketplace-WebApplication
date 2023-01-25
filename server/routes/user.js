const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const User = mongoose.model('User');

//localhost:5000/api/user/:id
// Get a user with specific id
router.get('/:id', (req, res) => { 
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;