const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    mes: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
