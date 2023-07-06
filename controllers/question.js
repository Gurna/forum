const QuestionSchema = require("../models/question");
const AnswerSchema = require("../models/answer");

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

module.exports.ASSIGN_ANSWER = async (req, res)=>{
  try{
    const question = await QuestionSchema.findOne({_id:req.body._id});
    const answer = await AnswerSchema.findOne({answer_id:req.body.answer_id});

    await QuestionSchema.updateOne(
      {_id:req.body._id},
      {
        $push: {answers: answer.answer_id}
        
      }
    );

    res.status(200).json({response: "Answer is assigned", answer: answer});

  }catch(err){
    console.log("err", err);
    res.status(500).json({response: "error assigning the answer"});
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

module.exports.GET_QUESTION = async function (req, res){
  try{
    const result = await QuestionSchema.findOne({_id:req.params.id}).exec();

    const questions = await QuestionSchema.find({
      answers: {$all: [req.body.answer_id, req.body.description]},
      _id: result._id,
      description: result.description,
    }).exec();

    const isQuestionAnswered = questions.lenght === 0? false : true;

    return res.status(200).json({question: result, isQuestionAnswered: isQuestionAnswered});

  }catch (err) {
    console.log("err", err);
    res.status(500).json({ response: "Failed" });
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