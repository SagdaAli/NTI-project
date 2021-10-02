const Admin = require('../models/admin.model')

//register
const register=async (req,res)=>{
    try{
        const adminData = new Admin(req.body)
        await adminData.save()
      
        res.status(200).send({
            apiStatus:true,
            data:adminData,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}

//login
const login=async(req,res)=>{
    try{
        let admin = await Admin.loginAdmin(req.body.email, req.body.password)
        const token = await admin.generateToken()
        res.status(200).send({ 
            apiStatus:true, 
            data:{admin,token}, 
            message:"logged in" 
        })
    }
    catch(e){
        res.status(500).send({ 
            apiStatus:false, 
            data:e.message, 
            message:"cannot login" 
        })
    }}

//logout
const logOut = async(req,res)=>{
    try{  
        req.admin.tokens = req.admin.tokens.filter(singleToken=>{
            return singleToken.token != req.token
        })
        req.admin.save()
        res.send({
            apiStatus:true, 
            data:"", 
            message:"logged out from this device"
        })
    }
    catch(e){
        res.status(500).send({ 
            apiStatus:false, 
            data:e.message, 
            message: 'error'
        })
    }
}

//logout all
const logOutAll = async(req,res)=>{
    try{
        req.admin.tokens=[]
        await req.admin.save()
        res.send({
            apiStatus:true, 
            data:"", 
            message:"logged out from all devices"
        })
    }
    catch(e){
        res.status(500).send({ 
            apiStatus:false, 
            data:e.message, 
            message: 'error'
        })
    }
}

//profile
const me = async(req,res)=>{ res.send(req.admin) }
module.exports={register,login,logOut,logOutAll,me}