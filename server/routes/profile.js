const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

//localhost:5000/api/profile/find/:id
router.get('/find/:id', (req,res) =>{
    let id = req.query.id;
    //console.log(req.query);
    User.find({username: id}, (err, docs) => {
        if(!err){
            res.json(docs);
        }
        else{
            console.log(err.message)
        }
    })
})

router.get('/:id',(req,res) => {
    let id = req.params.id;
    
    User.findOne({_id: id}, (err,docs)=>{
    if (!err){
        
      res.json(docs);

    }
  });
});

module.exports = router;