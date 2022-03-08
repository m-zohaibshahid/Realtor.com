const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    rent: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    video: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
