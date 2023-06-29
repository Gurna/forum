const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser= require("body-parser");
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer");
require("dotenv").config();

const mongoose = require("mongoose");


//užnaudojam end-point//
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(questionRouter);
app.use(answerRouter);

mongoose.connect(process.env.MONGO_CONNECT)
.then(()=>{
    console.log("CONNECTED to MongoDB");
})
.catch((err)=>{
    console.log("err connecting in MongoDB",err);
});

app.listen(process.env.PORT, ()=>{
    console.log("Your application is working!!!");
});