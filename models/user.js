const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: {type: String, min:4},
    name: {type: String, min: 3},
    email: {type: String, required: true},
    password: {type: String, required: true},
    given_answers:{type: Array},
    given_questions:{type: Array}
});

module.exports = mongoose.model("users", userSchema);