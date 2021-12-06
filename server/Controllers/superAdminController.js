const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");

//Show List of Users
const index = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    User.find()
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          message: "Error",
        });
      });
  }
};

//Show Single User
const show = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    let userID = req.body.userID;
    User.findById(userID)
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          message: "Error!",
        });
      });
  }
};

//Add User
const store = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      user
        .save()
        .then((user) => {
          res.json({
            message: "User Added Successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: error,
          });
        });
    });
  }
};

//Changepassword
const update = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    let userID = req.body.userID;

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      let updateduser = {
        password: hashedPass,
      };
      User.findByIdAndUpdate(userID, { $set: updateduser })
        .then((user) => {
          res.json({
            message: "User Updated Successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: "Error",
          });
        });
    });
  }
};

//Delete a User
const destroy = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    let userID = req.body.userID;
    let userStatus = {
      status:"inactive"
    }
    User.findByIdAndUpdate(userID,{ $set: userStatus })
      .then((user) => {
        res.json({
          message: "User Deleted Successfully",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
};
//Reactivate a User
const reActivate = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    let userID = req.body.userID;
    let userStatus = {
      status:"active"
    }
    User.findByIdAndUpdate(userID,{ $set: userStatus })
      .then((user) => {
        res.json({
          message: "User ReActivated",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  reActivate
};
