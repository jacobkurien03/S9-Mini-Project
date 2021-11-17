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
            status:"200",
            token,
          });
        } else {
          res.json({
            message: "Password Mismatch",
            status: "500"
        });
    }
});
} else {
    res.json({
        message: "No user Found!",
        status: "500"
      });
    }
  });
};

module.exports = {
  login,
};
