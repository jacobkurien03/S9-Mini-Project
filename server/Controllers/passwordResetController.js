const User = require("../Models/UserSchema");
const Token = require("../Models/token");
const sendEmail = require("../services/sendMail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const emailGenerator = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);
    return res.json({
      message: "password reset link sent to your email account",
    });
  } catch (error) {
    return res.json({
      status:500,
      message: error,
    });
  }
};

const forgotPassConfirmation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      let updateduser = {
        password: hashedPass,
      };
      User.findByIdAndUpdate(user.id, { $set: updateduser })
        .then(async(user) => {
          await token.delete();
          res.json({
            message: "Password Changed Successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: error,
          });
        });
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

module.exports = {
  emailGenerator,
  forgotPassConfirmation
};