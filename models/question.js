const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ text: String, points: Number }]
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
