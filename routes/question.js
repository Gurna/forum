const express = require("express");
const router = express.Router();

const{
POST_QUESTION,
GET_QUESTIONS,
GET_QUESTION,
ASSIGN_ANSWER,
DELETE_QUESTION_BY_ID,
// GET_QUESTION_BY_ID_WITH_ANSWERS,


} = require("../controllers/question");

router.post("/question", POST_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.post("/question/:id", GET_QUESTION);
router.post("/assignAnswer", ASSIGN_ANSWER);
router.delete("/question/:id", DELETE_QUESTION_BY_ID);
// router.get("/question/:id/answers", GET_QUESTION_BY_ID_WITH_ANSWERS);



module.exports = router;