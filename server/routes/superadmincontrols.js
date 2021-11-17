const express = require('express')
const router = express.Router()

const UserController = require('../Controllers/UserController')
const { route } = require('./authentication')
const Authenticate = require('../Middleware/authenticate')
const AdminGenerator = require('../Controllers/admingenerator')

/*To access these routes admin authentication is needed in the header............User should be an admin*/
/*To do so, copy the token of the admin when you login and paste it in the header with name Authorization and value as Bearer 'tokenvalue'*/

//Shows all users
router.get('/index',Authenticate,UserController.index)

//Select individual Users
router.post('/show',Authenticate,UserController.show)

//add New User
router.post('/store',Authenticate,UserController.store)

//Change Password
router.post('/changepass',Authenticate,UserController.update)

//Delete a user
router.post('/delete',Authenticate,UserController.destroy)

//Create New admin
router.post('/newadmin',Authenticate,AdminGenerator.admingenerator)

//Delete an admin
router.post('/deleteadmin',Authenticate,AdminGenerator.admindelete)

module.exports = router