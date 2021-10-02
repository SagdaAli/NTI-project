const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const Product = require('../models/product.model')
const productController = require('../controller/product.controller')
const upload = require('../middleware/fileUpload')

// add product
router.post('/addProduct',adminAuth, productController.addProduct)

router.get('/allProducts',productController.allProducts)
router.get('/productDetails/:id',productController.productDetails)

router.delete('/deleteProduct/:id',productController.deleteProduct)
router.patch('/editProduct/:id',productController.editProduct)

router.post('/addPImg', adminAuth, upload.single('img'), productController.addPImg)
module.exports = router