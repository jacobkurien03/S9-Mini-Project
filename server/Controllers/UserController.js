const User = require("../Models/UserSchema");
const UserAddress = require("../Models/user_address");
const bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");

const decode = async (req, res, next) => {
  let token = req.body.token;
  var decoded = jwt_decode(token);

  res.json({
    message: decoded,
  });
};

//Show User Details
const showUserDetails = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username })
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
};

//Changepassword
const changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    bcrypt.compare(req.body.oldPassword, user.password, function (err, result) {
      if (err) {
        return res.json({
          error: err,
          val: req.body.oldPassword,
        });
      }
      if (result) {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
          if (err) {
            return res.json({
              error: err,
            });
          }
          let updateduser = {
            password: hashedPass,
          };
          User.findByIdAndUpdate(user.id, { $set: updateduser })
            .then((user) => {
              return res.json({
                message: "Password Changed Successfully",
              });
            })
            .catch((error) => {
              return res.json({
                message: error,
              });
            });
        });
      } else {
        return res.json({
          message: "Password Mismatch",
          status: "500",
        });
      }
    });
    ////////////////
  } catch (error) {
    return res.json({
      status:500,
      message: error,
    });
  }
};

//Update User Details
const update = async (req, res, next) => {
  let body = req.body;
  let updatedUser = {
    name: body.name,
    username: body.username,
    phNum: body.phoneNumber,
  };
  const user = await User.findOne({ username: req.user.username });
  User.findByIdAndUpdate(user.id, { $set: updatedUser })
    .then((user) => {
      res.json({
        message: "Updated Details Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//Add User Address
const addAddress = async (req, res, next) => {
  let body = req.body;
  const user = await User.findOne({ username: req.user.username });
  let userAddress = new UserAddress({
    userId: user.id,
    address: body.address,
    city: body.city,
    postalCode: body.postalCode,
    country: body.country,
    phoneNumber: body.phoneNumber,
  });
  await userAddress
    .save()
    .then((address) => {
      res.json({
        message: address,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
};

//show Address
const showAddress = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  await UserAddress.find({ userId: user.id })
    .then((address) => {
      res.json({
        message: address,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//Delete Address
const deleteAddress = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const addressId = req.body.addressId;
  await UserAddress.findByIdAndRemove(addressId)
    .then((address) => {
      res.json({
        message: address,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//update Address
const updateAddress = async (req, res, next) => {
  let body = req.body;
  let updatedUser = {
    address: body.address,
    city: body.city,
    postalCode: body.postalCode,
    country: body.country,
    phoneNumber: body.phoneNumber,
  };
  const user = await User.findOne({ username: req.user.username });
  UserAddress.findByIdAndUpdate(body.addressId, { $set: updatedUser })
    .then((user) => {
      res.json({
        message: user,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

module.exports = {
  update,
  changePassword,
  showUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  showAddress,
};
