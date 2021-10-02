const User = require('../models/user.model')
//const emailSetting = require('../helper/sendEmail.helper')

//register
const register=async (req,res)=>{
    try{
        const userData = new User(req.body)
        await userData.save()
      //  emailSetting(userData.email, "test email")
        res.status(200).send({
            apiStatus:true,
            data:userData,
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

//add address
const addAddr=async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const addr = req.body
        user.addresses.push(addr)
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data:user,
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
        let user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ apiStatus:true, data:{user,token}, message:"logged in" })
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message:"cannot login" })
    }}

//logout
const logOut = async(req,res)=>{
    try{  
        req.user.tokens = req.user.tokens.filter(singleToken=>{
            return singleToken.token != req.token
        })
        req.user.save()
        res.send({apiStatus:true, data:"", message:"logged out from this device"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}

//logout all
const logOutAll = async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send({apiStatus:true, data:"", message:"logged out from all devices"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}

//profile
const me = async(req,res)=>{ res.send(req.user) }
module.exports={register,addAddr,login,logOut,logOutAll,me}









