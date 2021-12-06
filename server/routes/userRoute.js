const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/userController");
const Authenticate = require("../Middleware/authenticate")

//show Details
router.get("/showDetails",Authenticate, UserController.showUserDetails)

//change Password
router.post("/changePassword",Authenticate, UserController.changePassword)
//update Details
router.post("/updateUser",Authenticate,UserController.update)

//addAddress
router.post("/addAddress",Authenticate,UserController.addAddress)

//deleteAddress
router.post("/deleteAddress",Authenticate,UserController.deleteAddress)

//showAddress
router.get("/showAddress",Authenticate,UserController.showAddress)

//updateAddress
router.post("/updateAddress",Authenticate,UserController.updateAddress)

module.exports = router;
