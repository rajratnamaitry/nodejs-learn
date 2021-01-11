const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'], unique: true },
    email: { type: String, required: [true, 'email is required'], unique: true, lowercase: true,
    validate:[validator.isEmail,'email is not valid'] },
    password: {
        type: String,
        required: [true, 'name is required'],
        minlength:9
    },
    passwordConfrim: {
        type: String,
        required: [true, 'name is required'],
    },
    photo: String
})
const User = mongoose.model("User",userSchema);
module.exports = User;