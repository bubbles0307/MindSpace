const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  anonymousName: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  anonymousName: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
