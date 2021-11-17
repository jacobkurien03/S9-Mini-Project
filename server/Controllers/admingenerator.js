const User = require('../Models/UserSchema')
const bcrypt = require('bcryptjs')
const generator = require('generate-password');

var password = generator.generate({
	length: 10,
	numbers: true
});

const admingenerator = async (req,res,next)=>{
    const user = await User.findOne({username:req.user.username})
    if(user.role =='superadmin'){
        let userID = req.body.userID
        bcrypt.hash(password, 10, function(err, hashedPass){
            if(err){
                res.json({
                    error:err
                })
            }
            let updateduser = {
                password: hashedPass,
                role:'admin'
            }
            User.findByIdAndUpdate(userID, {$set: updateduser})
            .then(user=>{
                res.json({
                    message:`User is now an admin with new password : ${password} `
                })
            })
            .catch(error =>{
                res.json({
                    message:'Error'
                })
            })
        })
    }   
}

const admindelete = async (req,res,next)=>{
    const user = await User.findOne({username:req.user.username})
    if(user.role =='superadmin'){
        let userID = req.body.userID
        let updateduser = {
            role:'member'
        }
        User.findByIdAndUpdate(userID, {$set: updateduser})
        .then(user=>{
            res.json({
                message:`User is no longer an admin `
            })
        })
        .catch(error =>{
            res.json({
                message:'Error'
            })
        })   
    }
}

module.exports = {
    admingenerator,admindelete
}