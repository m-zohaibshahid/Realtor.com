const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  //   profileImage: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
