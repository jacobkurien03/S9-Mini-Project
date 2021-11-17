const User = require('../Models/UserSchema')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User ({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name,
            phNum:req.body.phNum,
            email:req.body.email,
            username:req.body.username,
            password: hashedPass
        })
        user.save()
        .then(user=>{
            res.json({
                message:'User Added Successfully'
            })
        })
        .catch(error =>{
            res.json({
                message:error.message
            })
        })
    })
    
}

module.exports= {
    register
}