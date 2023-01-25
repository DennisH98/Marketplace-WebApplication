const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array
    },
    productUserId: {
      type: String, unique: true
    },
  },
  { timestamps: true }
);

ConversationSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Conversation", ConversationSchema);