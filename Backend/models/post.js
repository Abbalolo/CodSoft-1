const mongoose = require("mongoose"); // cloud database
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  categories: {
    type: Array,
  },


 
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);
