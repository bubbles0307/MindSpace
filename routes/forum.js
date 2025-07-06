const express = require("express");
const Post = require("../models/post");
const router = express.Router();

// GET forum page
router.get("/forum", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("forum", { posts, anonymousName: req.session.anonymousName });
  } catch (err) {
    res.status(500).send("Error loading forum");
  }
});

// POST a new forum post
router.post("/forum/post", async (req, res) => {
  if (!req.session.anonymousName) return res.redirect("/login");

  const { title, content } = req.body;

  try {
    const post = new Post({
      anonymousName: req.session.anonymousName,
      title,
      content,
    });

    await post.save();
    res.redirect("/forum");
  } catch (err) {
    res.status(500).send("Error posting to forum");
  }
});

// POST a comment
router.post("/forum/:postId/comment", async (req, res) => {
  if (!req.session.anonymousName) return res.redirect("/login");

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).send("Post not found");

    post.comments.push({
      anonymousName: req.session.anonymousName,
      content: req.body.content,
    });

    await post.save();
    res.redirect("/forum");
  } catch (err) {
    res.status(500).send("Error adding comment");
  }
});

module.exports = router;
