const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

//product related routes can go here
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); //direct path to current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-"+ file.originalname);
    },
});

const upload = multer({storage:imageStorage});
  
//localhost:5000/api/product/create
//Create Product
router.post('/create',upload.single("img"), (req, res) => { // or fileImg?
    
    const newProduct = new Product({
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        price: req.body.price ,
        img: req.file.filename,
        mainCategory: req.body.mainCategory,
        subCategory: req.body.subCategory ,
        status: req.body.status,
        condition: req.body.condition ,
        location: req.body.location ,
        sellerID: req.body.sellerID,
        postType: req.body.postType
    });

    newProduct
        .save()
        .then(()=> res.json("New Product Created with ID: " + newProduct._id))
        .catch((error) => res.status(400).json(`Error: ${error}`));

});

//localhost:5000/api/product/all
//Get All Products
router.get('/all',(req,res) =>{
    
    Product.find((err,docs)=>{
      
      if (!err){

        res.json(docs);

      }else{

        console.log(err);
      }
    });

});

//localhost:5000/api/product/main-category
//Display all products with specfic main Category
router.get('/main-category',(req,res) =>{
  
  Product.find({mainCategory: req.query.mainCategory},(err,docs)=>{
    
    if (!err){

      res.json(docs);
    
    }else{

      console.log(err);
    }
  });

});

//localhost:5000/api/product/sub-category
//Display all products with specfic sub Category
router.get('/sub-category',(req,res) =>{
  
  Product.find({subCategory: req.query.subCategory},(err,docs)=>{
    
    if (!err){

      res.json(docs);

    }else{

      console.log(err);
    }
  });

});

//localhost:5000/api/product/user-product
//Get all products related to logged in user
router.get('/user-products',(req,res) => {
  Product.find({sellerID: req.query.sellerID},(err,docs)=>{
    
    if (!err){

      res.json(docs);
      
    }else{

      console.log(err);
    }
  });

});

router.get('/other-products',(req,res) => {
  User.find({username: req.query[0]},(err,docs)=>{
    
    if (!err){

      var id = mongoose.Types.ObjectId(docs[0]._id)
      Product.find({sellerID: id},(err,docs)=>{
    
        if (!err){
          res.json(docs);
          
        }else{
    
          console.log(err.message);
        }
      });
      
      
    }else{

      console.log(err);
    }
  });

});


//localhost:5000/api/product/:id
// Get a product with specific id
router.get('/:id', (req, res) => { 
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));

});




module.exports = router;