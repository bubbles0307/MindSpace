const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); 

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, anonymousName, email, password, phone } = req.body;

    if (!name || !anonymousName || !email || !password || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
    
        const newUser = new User({ name,anonymousName, email, password,phone});
        await newUser.save();

        req.session.userId = newUser._id;
        req.session.anonymousName = newUser.anonymousName;
        //res.send('User registered successfully');
        res.redirect("/login");
      } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).send('Error registering user');
      }
  
});

// Login User
  router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).json({ error: "All fields are required" });

    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        // Store user ID in session
        req.session.userId = user._id;
        req.session.anonymousName = user.anonymousName;

        res.redirect("/homepage");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error("Logout error:", err);
          return res.status(500).send("Could not log out. Try again.");
      }
      res.redirect("/login");
  });
});

module.exports = router;
