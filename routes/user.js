const express = require("express");
const router = express.Router();


const {
    SIGN_UP,
    LOGIN,
    INSERT_USER, 
} = require("../controllers/user");

router.post("/signUP", SIGN_UP);
router.post("/login", LOGIN);
router.post("/user", INSERT_USER);



module.exports = router;