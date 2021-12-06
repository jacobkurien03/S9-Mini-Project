const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username != null && password != null) {
    User.findOne({
      $or: [{ username: username }, { email: username }],
    }).then((user) => {
      if (user) {
        if (user.status === "active") {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return res.status(500).send({ error: err });
            }
            if (result) {
              let token = jwt.sign(
                { username: user.username },
                process.env.Secret,
                { expiresIn: "1h" }
              );

              return res.status(200).send({
                message: "Logged in Successful",
                token: "Bearer " + token,
                role: user.role,
              });
            } else {
              return res.status(500).send({
                message: "Password Mismatch",
              });
            }
          });
        } else {
          return res.status(500).send({
            message: "Password Mismatch",
          });
          return res.json({
            message: "No User Found!",
            status: 500,
          });
        }
      } else {
        return res.status(500).send({
          message: "No user Found!",
        });
      }
    });
  } else if (username == null) {
    return res.status(500).send({
      message: "Provide UserName",
    });
  } else if (password == null) {
    return res.status(500).send({
      message: "Provide Password",
    });
  } else {
    return res.status(500).send({
      message: "Login Failed",
    });
  }
};

module.exports = {
  login,
};
