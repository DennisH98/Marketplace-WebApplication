const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
  {
    startingPrice: { type: Number, required: true }, // initial price
    currentPrice: { type: Number, required: true }, // highest price currently
    productID: { type: String, required: true, unique: true },
    sellerID: { type: String, required: true },
    buyerID: { type: String },
    status: { type: String, required: true },
  }

);

mongoose.model("Bid", BidSchema);