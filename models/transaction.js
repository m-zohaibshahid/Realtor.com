const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema(
  {
    details: {
      type: Object,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    paymentVerified: {
      type: String,
      default: "unpaid",
    },
    buildingType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    addStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
