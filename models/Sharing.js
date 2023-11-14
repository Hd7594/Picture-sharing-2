const mongoose = require("mongoose");

const Sharing = mongoose.model("Picture", {
  name: String,
  description: String,
  author: String,
  picture: Object,
});

module.exports = Sharing;
