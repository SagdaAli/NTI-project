const router = require('express').Router()

const auth = require('../middleware/auth')

const cartController=require('../controller/cart.controller');

router.post('/addToCart',cartController.addToCart)

module.exports=router