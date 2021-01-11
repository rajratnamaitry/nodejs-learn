const user = require('../model/userModel');
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
    res.status(200).json({
        status : 'success',
        data: {
            user : newUser
        }
    })
}