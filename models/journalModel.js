const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with a user
    date: { type: Date, default: Date.now },
    title: String,
    content: String,
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;

