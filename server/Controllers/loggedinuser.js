const User = require('../Models/UserSchema')

const userdetails = async (req,res,next)=>{
    const user = await User.findOne({username:req.user.username})
    return res.status(200).send({
        username:user.username,
        email:user.email,
        name:user.name,
        role:user.role
      });
}
module.exports = userdetails