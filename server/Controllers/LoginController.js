const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    $or: [{ username: username }, { email: username }],
  }).then((user) => {
    if (user) {
      if (user.status === "active") {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign(
              { username: user.username },
              process.env.Secret,
              { expiresIn: "1h" }
            );
            res.json({
              message: "Logged in Successful",
              status: "200",
              token: "Bearer " + token,
            });
          } else {
            res.json({
              message: "Password Mismatch",
              status: "500",
            });
          }
        });
      } else {
        return res.json({
          message: "No User Found!",
          status: "500",
        });
      }
    } else {
      res.json({
        message: "No user Found!",
        status: "500",
      });
    }
  });
};

module.exports = {
  login,
};
