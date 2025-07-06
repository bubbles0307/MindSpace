const express = require("express");
const router = express.Router();
const Question = require("../models/question.js");

// Get a question by index
router.get("/question/:index", async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const questions = await Question.find();
        if (index < questions.length) {
            res.json({ question: questions[index], total: questions.length });
        } else {
            res.json({ question: null, total: questions.length });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Submit answers and determine category
router.post("/submit", (req, res) => {
    try {
        const { answers } = req.body;
        const totalScore = answers.reduce((acc, curr) => acc + curr.points, 0);
        let category, buttons, message;

        if (totalScore < 20) {
            category = "Minimal to No Concern";
            buttons = ["button1"];
            message = "Your responses indicate minimal to no concern.";
        } else if (totalScore >= 21 && totalScore <= 70) {
            category = "Mild/Moderate Concern";
            buttons = ["button1", "button2"];
            message = "Your responses indicate mild to moderate concern. Consider seeking guidance.";
        } else {
            category = "High Concern";
            buttons = ["button2"];
            message = "Your responses indicate high concern. It is strongly recommended to seek help.";
        }

        res.json({ category, buttons, message });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
