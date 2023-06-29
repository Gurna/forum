const AnswerSchema = require("../models/answer");

module.exports.POST_ANSWER = async function (req, res) {
  try {
    console.log(req.body);

    const answer = new AnswerSchema({
      date: req.body.date,
      author: req.body.author,
      description:req.body.description
    });

    const result = await answer.save();

    return res.status(200).json({
      answer: result,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ response: "Failed to post answer" });
  }
};

module.exports.DELETE_ANSWER_BY_ID = async (req, res) => {
    try {
      await EventSchema.deleteOne({ _id: req.params.id }).exec();
  
      return res.status(200).json({ statusMessage: "deleted successfully" });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ response: "Failed, try again" });
    }
  };