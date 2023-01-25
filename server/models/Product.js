const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true},
    productDesc: { type: String, required: true }, //required?
    price: { type: Number, required: true },
    //img: {data: Buffer, contentType: String}, //image object?
    img: {type: String, required:true },
    mainCategory: {type: String, required: true},
    subCategory: {type: String, required: true},
    status: {type: String},
    condition: {type: String},
    location: {type: String},
    sellerID: {type: String},
    postType: {type: String}  // either sale or bid
  }

);

mongoose.model("Product", ProductSchema);