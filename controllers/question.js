const QuestionSchema = require("../models/question");

module.exports.POST_QUESTION = async function (req, res) {
  try {
    console.log(req.body);

    const question = new QuestionSchema({
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      description:req.body.description,
      answers: [],
    });

    const result = await question.save();

    return res.status(200).json({
      question: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ response: "Failed to post question" });
  }
};

module.exports.GET_QUESTIONS = async function (req, res) {
  try {
    const result = await QuestionSchema.find().sort("date").exec();
    return res.status(200).json({ question: result});
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ response: "Failed to get questions" });
  }
};
module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    await QuestionSchema.deleteOne({ _id: req.params.id }).exec();

    return res.status(200).json({ statusMessage: "Eddited successfully" });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ response: "Failed" });
  }
};