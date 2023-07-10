const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_id: {type: String, min:4},
    user_name: {type: String, min: 3},
    user_email: {type: String, required: true},
    user_password: {type: String, required: true},
    user_photo:{type:String, required:true},
    user_position:{type: String, required:true},
    given_answers:{type: Array},
    given_questions:{type: Array}
});

module.exports = mongoose.model("users", userSchema);