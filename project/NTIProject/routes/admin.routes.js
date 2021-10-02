const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const Admin = require('../models/admin.model')
const adminController=require('../controller/admin.controller')


// register
router.post('/register', adminController.register)

// login
router.post('/login', adminController.login)

//logout
router.post('/logout',adminAuth, adminController.logOut)
router.post('/logoutAll',adminAuth, adminController.logOutAll)

//profile
router.post('/me',adminAuth,adminController.me)


module.exports = router