const mongoose = require("mongoose");
const { boolean } = require("yup");

const roomSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
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
    lastMessage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    click: {
      type: Boolean,
      defaut: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
