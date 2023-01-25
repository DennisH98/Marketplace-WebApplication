const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bid = mongoose.model('Bid');

//localhost:5000/api/bid/:id
// Get a bid for the specific product
router.get('/:id', (req, res) => { 
    Bid.findOne({"productID": req.params.id})
      .then(bid => res.json(bid))
      .catch(err => res.status(400).json('Error: ' + err));

});

//localhost:5000/api/bid/create
router.post('/create', (req, res) => {
    const newBid = new Bid({
            startingPrice: req.body.startingPrice,
            currentPrice: req.body.currentPrice,
            productID: req.body.productID,
            sellerID: req.body.sellerID,
            buyerID: req.body.buyerID,
            status: req.body.status,
        });

        newBid
            .save()
            .then(()=> res.json("New Bid Created"))
            .catch((error) => res.status(400).json(`Error: ${error}`));
});

//localhost:5000/api/bid/update/:id
router.put('/update/:id', (req, res) => {
    //Handle any changes in bid
    Bid.findOne({"productID": req.params.id}, (err, bid) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Bid does not exist',
            })
        }
        bid.startingPrice = req.body.startingPrice
        bid.currentPrice = req.body.currentPrice
        bid.productID = req.body.productID
        bid.sellerID = req.body.sellerID
        bid.buyerID = req.body.buyerID
        bid.status = req.body.status

        bid
            .save()
            .then(()=> res.json("Bid Updated"))
            .catch((error) => res.status(400).json(`Error: ${error}`));
    })
});

module.exports = router;