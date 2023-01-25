const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    reviewerID: { type: String, required: true},
    revieweeID: { type: String, required: true },
    rating: { type: Number, required: true },
    review: {type: String, required:true }
  }

);

mongoose.model("Review", ReviewSchema);