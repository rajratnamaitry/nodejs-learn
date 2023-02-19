const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'], unique: true },
    email: { type: String, required: [true, 'email is required'], unique: true, lowercase: true,
    validate:[validator.isEmail,'email is not valid'] },
    password: {
        type: String,
        required: [true, 'name is required'],
        minlength:9,
        select:false
    },
    passwordConfrim: {
        type: String,
        required: [true, 'passwordConfrim not match'],
        validate:{
            validator:function(e){
                return e === this.password;
            }
        },
        select:false
    },
    photo: String
})
userSchema.pre('save', async function(next){
    if(!this.isModified) return next();
    this.password = await bcrypt.hash(this.password , 12);
    this.passwordConfrim  = undefined;
    next();
})
userSchema.methods.correctPassword = async function(candidatePassword , password){
    return await bcrypt.compare(candidatePassword,password);
}
const User = mongoose.model("User",userSchema);
module.exports = User;