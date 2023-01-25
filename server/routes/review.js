const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

//localhost:5000/api/review/create
router.post('/create', (req, res) => {

    const newReview = new Review({
        reviewerID: req.body.reviewerID,
        revieweeID: req.body.revieweeID,
        rating: req.body.rating,
        review: req.body.review,
    });

    newReview
        .save()
        .then(() => res.json("New Review Logged"))
        .catch((error) => res.status(400).json(`Error: ${error}`));

});
//localhost:5000/api/review/:id
router.get('/:id', async (req, res) => {
    let id = req.query.id;
    Review.find({ revieweeID: id }, (err, docs) => {
        if (!err) {
            res.json(docs);
        }
        else {
            console.log(err.message)
        }
    })
})

module.exports = router;
