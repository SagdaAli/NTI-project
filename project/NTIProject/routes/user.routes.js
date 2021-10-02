const router = require('express').Router()
const auth = require('../middleware/auth')
const User = require('../models/user.model')
const userController=require('../controller/user.controller')
//const emailSetting = require('../helper/sendEmail.helper')
// register
router.post('/register', userController.register)

// add address 
router.post('/addAddr/:id', userController.addAddr)
// login
router.post('/login', userController.login)

router.post('/logout',auth, userController.logOut)
router.post('/logoutAll',auth, userController.logOutAll)
router.post('/me',auth,userController.me)


module.exports = router