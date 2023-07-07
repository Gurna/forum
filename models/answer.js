const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  answer_date: { type: String, required: true, min: 8 },
  answer_author: { type: String, required: true, min: 3 },
  answer_description: { type: String, required: true, min: 4 },
  answer_id:{type: String, min: 4}
});

module.exports = mongoose.model("Answer", answerSchema);