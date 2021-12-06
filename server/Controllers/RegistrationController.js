const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      phNum: req.body.phNum,
      email: req.body.email,
      username: req.body.username,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        return res.status(200).send({
          message: "User Added Successfully",
        });
      })
      .catch((error) => {
        return res.status(500).send({
          message: error.message,
        });
      });
  });
};

module.exports = {
  register,
};
