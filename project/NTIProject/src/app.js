const express = require('express')
const app = express()
//const app = require('express')()

require('dotenv').config()
require('../models/db/connection')
const userRoutes = require('../routes/user.routes')
const adminRoutes=require('../routes/admin.routes')
const productRoutes = require('../routes/product.routes')
const categoryRoutes=require('../routes/category.routes')
const cartRoutes=require('../routes/cart.routes')

const cors = require('cors')
app.use(cors())

app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )

app.use('/user', userRoutes )
app.use('/admin', adminRoutes )
app.use('/admin', productRoutes )
app.use('/admin',categoryRoutes)
app.use('/cart',cartRoutes)

module.exports = app