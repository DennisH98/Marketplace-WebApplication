const router = require("express").Router();
const Conversation = require("../models/Conversation");

// Create new conversation
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
      members: [
        req.body.senderId, 
        req.body.productId,
        req.body.sellerId,
        req.body.productName
      ],
      productUserId: req.body.productUserId,
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get conversation using userId
  router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;