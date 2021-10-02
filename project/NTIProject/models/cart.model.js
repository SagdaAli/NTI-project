const mongoose = require('mongoose')
const validator = require('validator')
const cartSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    price:{
        type:Number
    },
    amount:{
        type:Number,
        required:true,
        validate(value){
            if(value<1) throw new Error(' minmum amount is 1')
        }
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    prodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
    
},{timestamps:true}) 


const cartItem=mongoose.model('Cart',cartSchema);
module.exports=cartItem