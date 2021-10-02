const mongoose = require('mongoose')
const validator = require('validator')


const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    description:{
        type:String,
       // required:true,
        trim:true
    }, 
    category:{
        //type:mongoose.Schema.Types.ObjectId,
        //ref:"Category",
        type:String,
        enum:['women','kids','bigSize'],
        required:true
    },
    price:{
        type:Number,
        required:true,
        validate(value){
            if(value<1) throw new Error(' minmum price 1$')
        }
    }, 
    image:{
        type:String,
        trim:true
    }, 
    status:{
        type:Boolean,
        default: false
    }
}, 
{timestamps:true}
)







const Product = mongoose.model('Product', productSchema)

module.exports = Product