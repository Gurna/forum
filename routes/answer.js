const express = require("express");
const router = express.Router();

const{
POST_ANSWER,
DELETE_ANSWER_BY_ID,
} = require("../controllers/answer");

router.post("/answer", POST_ANSWER);
router.delete("/answer/:id", DELETE_ANSWER_BY_ID);



module.exports = router;