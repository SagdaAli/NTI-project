const router = require('express').Router()
const auth = require('../middleware/auth')

const Category=require('../models/category.model')
const categoryController=require('../controller/category.controller')

router.post('/addCat',categoryController.addCat)





module.exports=router