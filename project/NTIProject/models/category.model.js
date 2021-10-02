const mongoose = require('mongoose')
const validator = require('validator')

const categorySchema=new mongoose.Schema({
    catName:{
        type:String,
        required:true
       
    }

},{timestamps:true})





const Category=mongoose.model('Category',categorySchema)
module.exports=Category
