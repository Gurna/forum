const express = require("express");
const router = express.Router();


const {
    SIGN_UP,
    LOGIN,
    INSERT_USER,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    POST_ANSWER,
    POST_QUESTION
} = require("../controllers/user");

router.post("/signUP", SIGN_UP);
router.post("/login", LOGIN);
router.post("/user", INSERT_USER);
router.get("/users", GET_ALL_USERS);
router.get("/user/:id", GET_USER_BY_ID);
router.post("/postAnswer", POST_ANSWER);
router.post("/postQuestion", POST_QUESTION);



module.exports = router;