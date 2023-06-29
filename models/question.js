const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  date: { type: String, required: true, min: 3 },
  author: { type: String, required: true, min: 3 },
  description: { type: String, required: true, min: 4 },
  answers: { type: Array, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
