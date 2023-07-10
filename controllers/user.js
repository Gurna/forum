
const UserSchema = require("../models/user");
const AnswerSchema = require("../models/answer");
const QuestionSchema = require("../models/question");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

module.exports.SIGN_UP = async (req, res)=>{
    try{
        const {user_name, user_email, user_password, user_photo, user_position} = req.body;
        
        if(!user_email.includes('@')){
            return res.status(400).json({res: "wrong e-mail, please check!"})
        }

        const hasNumber = /\d/.test(user_password);
        if (user_password.length < 6 || !hasNumber) {
            return res.status(400).json({ res: 'Password should have at least 6 symbols and number in it' });
    }

    bcrypt.genSalt(10,(err, salt)=>{
      bcrypt.hash(req.body.user_password, salt, async (err, hash)=>{
        const newUser = await UserSchema.findOne({
          user_name: req.body.user_name, 
          user_email: req.body.user_email, 
          user_password: hash,
          user_photo: req.body.user_photo,
          user_position: req.body.user_position
        });
        const result= await user.save();
        })
      });
  
    if (newUser) {
      return res.status(400).json({ res: 'User with the given data already exists' });
    }

    const createdUser = await UserSchema.create({user_name,user_email, user_password, user_photo, user_position});
    return res.status(200).json({res: "Registration is successful", createdUser});
    } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "Smth went wrong, please try later" });
    }
};

module.exports.LOGIN = async (req, res) => {
    try {
      const user = await UserSchema.findOne({ user_email: req.body.user_email});
  
      if (!user) {
        return res.status(401).json({ response: "Bad data" });
      }
  
      bcrypt.compare(req.body.user_password, user.user_password, (err, isPasswordMatch) => {
      
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              user_email: user.user_email,
              user_id: user.user_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {algorithm: "RS256"}
          );
          res.status(200).json({ response: "You are logged in", token: token});
        } else {
          return res.status(401).json({ response: "Bad data, try again" });
        }
      });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "Smth went wrong, please try later" });
    }
  };

module.exports.INSERT_USER = async (req, res)=>{
    try{

      bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(req.body.user_password, salt, async (err, hash)=>{
          const user = new UserSchema({
            user_id: uniqid(),
            user_name: req.body.user_name,
            user_email: req.body.user_email,                
            user_password: hash,
            user_photo: req.body.user_photo,
            user_position:req.body.user_position,
            given_answers:[],
            given_questions:[],
    });
    const result= await user.save();
        })
      })
     
return res.status(200).json({response: "User is successfully inserted", user: result});
    
}catch(err){ 
        res.status(500).json({response: "Error in inserting user in DB"});
    };
};

module.exports.GET_ALL_USERS = async (req, res)=>{
    try{

    // const token =req.headers.authorization;
    // console.log("token", token);

    // jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
    //     if(err){
    //     return res.status(401).json({response: "Authorization failed"})
    //     }
        
        const users = await UserSchema.find();
        // users.sort((a,b)=> a.name.localeCompare(b.name));
        res.status(200).json({users: users});
    // });
    }catch(err){
        res.status(500).json({response: "Error in getting users"});
    };
};

module.exports.GET_USER_BY_ID = async (req, res)=>{
    try{

        const token = req.headers.authorization;
        console.log("token", token);

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
            if(err){
            return res.status(401).json({response: "Authorization failed"})
            }

    const users = await UserScema.findOne({id:req.params.id});
    res.status(200).json({users: users});
    });
}catch(err){ 
        res.status(500).json({response: "Error in getting users"});
    };
};

module.exports.POST_ANSWER = async (req, res)=>{
  try{
    const user = await UserSchema.findOne({id:req.body.id});
    const answer = await AnswerSchema.findOne({answer_id:req.body.answer_id});

    await UserSchema.updateOne(
      {id:req.body.id},
      {
        $push: {given_answers: answer.answer_id}
        
      }
    );

    res.status(200).json({response: "Answer is assigned", answer: answer});

  }catch(err){
    console.log("err", err);
    res.status(500).json({response: "error assigning the answer"});
  }
};

module.exports.POST_QUESTION = async (req, res)=>{
  try{
    const user = await UserSchema.findOne({id:req.body.id});
    const question = await QuestionSchema.findOne({_id:req.body._id});

    await UserSchema.updateOne(
      {id:req.body.id},
      {
        $push: {given_questions: question._id}
        
      }
    );

    res.status(200).json({response: "Question is assigned", question: question});

  }catch(err){
    console.log("err", err);
    res.status(500).json({response: "error assigning the question"});
  }
};




