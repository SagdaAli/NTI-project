const Admin = require('../models/admin.model')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next)=>{
    try{    
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTKEY)
        const admin = await Admin.findOne({_id:decoded._id, 'tokens.token':token})
        if(!admin) throw new Error('user not found')
        // res.send(user)
        req.admin= admin
        req.token= token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"unAuthorized"
        })
    }
}

module.exports = auth