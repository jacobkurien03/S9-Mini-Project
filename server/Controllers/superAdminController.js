const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");

//Show List of Users
const index = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    User.find()
      .then((response) => {
        return res.status(200).send({
          response,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          message: error.message,
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
        return res.status(200).send({
          response,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          message: error.message,
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
        return res.status(500).send({
          message: err,
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
  }
};

//Changepassword
const update = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  if (user.role == "superadmin") {
    let userID = req.body.userID;

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        return res.status(500).send({
          message: err,
        });
      }
      let updateduser = {
        password: hashedPass,
      };
      User.findByIdAndUpdate(userID, { $set: updateduser })
        .then((user) => {
          return res.status(200).send({
            message: "User Updated Successfully",
          });
        })
        .catch((error) => {
          return res.status(500).send({
            message: error.message,
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
      status: "inactive",
    };
    User.findByIdAndUpdate(userID, { $set: userStatus })
      .then((user) => {
        return res.status(200).send({
          message: "User Deleted Successfully",
        });
      })
      .catch((error) => {
        return res.status(500).send({
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
      status: "active",
    };
    User.findByIdAndUpdate(userID, { $set: userStatus })
      .then((user) => {
        return res.status(200).send({
          message: "User ReActivated",
        });
      })
      .catch((error) => {
        return res.status(500).send({
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
  reActivate,
};
