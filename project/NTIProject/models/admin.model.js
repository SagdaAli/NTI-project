const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email format')
        }
    }, 
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error( 'not egy number')
        }
    }, 
    password:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    tokens:[{token:{type:String,required:true}}]
}, 
{timestamps:true}
)

//handle response
adminSchema.methods.toJSON = function(){
    const admin = this.toObject()
    delete admin.password
    delete admin.__v
    return admin
}

// encrypt password
adminSchema.pre('save', async function(){
    const admin = this
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 12 )
    }
})

//login
adminSchema.statics.loginAdmin = async(email, password) => {
    const admin = await Admin.findOne({email})
    if(!admin) throw new Error('Invalid email')
    const isValidPass = await bcrypt.compare(password, admin.password)
    if(!isValidPass) throw new Error('invalid password')
    return admin
}

const jwt=require('jsonwebtoken')
//generate token
adminSchema.methods.generateToken=async function(){
        const admin=this 
        const token =jwt.sign({_id:admin._id},process.env.JWTKEY)
        admin.tokens=admin.tokens.concat({token})
        await admin.save()
        return token
}
const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin