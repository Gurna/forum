
const UserSchema = require("../models/user");
const AnswerSchema = require("../models/answer");
const QuestionSchema = require("../models/question");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports.SIGN_UP = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        
        if(!email.includes('@')){
            return res.status(400).json({res: "wrong e-mail, please check!"})
        }

        const hasNumber = /\d/.test(password);
        if (password.length < 6 || !hasNumber) {
            return res.status(400).json({ res: 'Password should have at least 6 symbols and number in it' });
    }
    const newUser = await UserSchema.findOne({name: req.body.name, email: req.body.email, password: req.body.password});
    if (newUser) {
      return res.status(400).json({ res: 'User with the given data already exists' });
    }

    const createdUser = await UserSchema.create({name,email, password});
    return res.status(200).json({res: "Registration is successful", createdUser});
    } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "Smth went wrong, please try later" });
    }
};

module.exports.LOGIN = async (req, res) => {
    try {
      const user = await UserSchema.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({ response: "Bad data" });
      }
  
      bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {algorithm: "RS256"}
          );
        }
      });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "Smth went wrong, please try later" });
    }
  };



module.exports.INSERT_USER = async (req, res)=>{
    try{

                const user = new UserSchema({
                    id: req.body.id,
                    name: req.body.name,
                    email: req.body.email,                
                    password: req.body.password,
                    given_answers:[],
                    given_questions:[],
            });

            
         const result= await user.save();
     
return res.status(200).json({response: "User is successfully inserted", user: result});
    
}catch(err){ 
        res.status(500).json({response: "Error in inserting user in DB"});
    };
};

module.exports.GET_ALL_USERS = async (req, res)=>{
    try{

    const token =req.headers.authorization;
    console.log("token", token);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if(err){
        return res.status(401).json({response: "Authorization failed"})
        }
        
        const users = await UserSchema.find();
        users.sort((a,b)=> a.name.localeCompare(b.name));
        res.status(200).json({users: users});
    });
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


