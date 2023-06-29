const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  date: { type: String, required: true, min: 8 },
  author: { type: String, required: true, min: 3 },
  description: { type: String, required: true, min: 4 },
});

module.exports = mongoose.model("Answer", answerSchema);