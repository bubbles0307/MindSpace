const express = require("express");
const Journal = require("../models/journalModel");
//const { ensureAuthenticated } = require("../middleware/auth");
const path = require("path");

const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect("/login");
}

// Show journal page
router.get("/", ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/journal.html"));
});

// Post a new journal entry
router.post("/post", ensureAuthenticated, async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const journalEntry = new Journal({
            user: req.session.userId, // CHANGED from req.user.id
            date: date || new Date(),
            title,
            content,
        });

        await journalEntry.save();
        res.redirect("/journal/view-entries");
    } catch (error) {
        console.error("Error saving journal entry:", error);
        res.status(500).send("Error saving journal entry");
    }
});

// View journal entries
router.get("/view-entries", ensureAuthenticated, async (req, res) => {
    try {
        const entries = await Journal.find({ user: req.session.userId }).sort({ date: -1 }); // CHANGED from req.user.id
        res.render("journal/entries", { entries });
    } catch (error) {
        console.error("Error retrieving journal entries:", error);
        res.status(500).send("Error retrieving journal entries");
    }
});

// Edit an entry
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
    try {
        const entry = await Journal.findOne({ _id: req.params.id, user: req.session.userId }); // CHANGED from req.user.id
        if (!entry) {
            return res.status(403).send("Unauthorized");
        }
        res.render("journal/edit", { entry });
    } catch (error) {
        console.error("Error retrieving entry:", error);
        res.status(500).send("Error retrieving entry");
    }
});

// Update an entry
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const updatedEntry = await Journal.findOneAndUpdate(
            { _id: req.params.id, user: req.session.userId }, // CHANGED from req.user.id
            { date, title, content },
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(403).send("Unauthorized");
        }

        res.redirect("/journal/view-entries");
    } catch (error) {
        console.error("Error updating entry:", error);
        res.status(500).send("Error updating entry");
    }
});

// Delete an entry
router.post("/delete/:id", ensureAuthenticated, async (req, res) => {
    try {
        const deletedEntry = await Journal.findOneAndDelete({ _id: req.params.id, user: req.session.userId }); // CHANGED from req.user.id
        if (!deletedEntry) {
            return res.status(403).send("Unauthorized");
        }

        res.redirect("/journal/view-entries");
    } catch (error) {
        console.error("Error deleting entry:", error);
        res.status(500).send("Error deleting entry");
    }
});


module.exports = router;
