const express = require('express')
const router = express.Router()

const RegistrationController = require('../Controllers/RegistrationController')
const LoginController = require('../Controllers/LoginController')
const passwordResetController = require('../Controllers/passwordResetController')
const loggedinuser = require('../Controllers/loggedinuser')
const Authenticate = require('../Middleware/authenticate')



router.post('/forgotPassword' , passwordResetController.emailGenerator)

//New user Registration (Not required Currently)
router.post('/register' , RegistrationController.register)

//User/admin Login
router.post('/login' , LoginController.login)

router.post('/userdetails',Authenticate, loggedinuser)
router.post("/:userId/:token" , passwordResetController.forgotPassConfirmation)

module.exports = router