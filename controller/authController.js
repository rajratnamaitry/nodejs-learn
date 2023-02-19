const user = require('../model/userModel');
const jwt = require('jsonwebtoken');
const signToken = id =>{
   return jwt.sign({ id },process.env.JWT_SECRETE,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
exports.getAllUsers = async (req,res, next) =>{
    const allUser = await user.find();
    res.status(200).json({
        status: 'success',
        data:{
            user:allUser
        }
    });
}
exports.signup = async (req ,res ,next) =>{
    const newUser = await user.create(req.body);
    const token = signToken(newUser._id);
    res.status(200).json({
        status : 'success',
        token,
        data: {
            user : newUser
        }
    })
}
exports.login = async (req, res , next)=>{
    const userLogin = await user.findOne({ email: req.body.email }).select('+password');
    const correct = userLogin.correctPassword(req.body.password, userLogin.password);
    if(!userLogin || !correct){
        return next()
    }
    const token = signToken(userLogin._id);
    res.status(200).json({
        status : 'success',
        token
    })
}