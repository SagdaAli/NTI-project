const Product=require('../models/product.model')

const addProduct=async (req,res)=>{
    try{
        const productData = new Product(req.body)
        await productData.save()
        res.status(200).send({
            apiStatus:true,
            data:productData,
            message:"producted added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in adding product"
        })
    }
}

//all products
const allProducts =async(req,res)=>{
   try{
    const productData=await Product.find()
    res.status(200).send({
     apiStatus:true,
     data:productData,
     message:"all productes "
 })
   }
   catch(e){
    res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error in getting products"
    })
   }
}
const productDetails=async(req,res)=>{
    try{
        const productData = await Product.findById(req.params.id)
        if(!productData) res.send('product not found')
        res.status(200).send({
            apiStatus:true,
            data:productData,
            message:" producte details "
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in getting products"
        })
    }
}

//delete product
const deleteProduct=async(req,res)=>{
    try{
      const productData=await Product.findByIdAndDelete(req.params.id)
      if(!productData) res.send('product not found')
      res.status(200).send({
        apiStatus:true,
        data:"",
        message:" product deleted "
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in deleting product"
        })
    }
}

//editProduct
const editProduct=async(req,res)=>{
    try{
        const productData=await Product.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
        if(!productData) res.send('product not found')
        res.status(200).send({
            apiStatus:true,
            data:productData,
            message:" product updated successfully "
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in updateing product"
        })
    }
}

const addPImg = async(req, res)=>{
    res.status(200).send({data:'uploaded'})
}
module.exports={addProduct,allProducts,productDetails,deleteProduct,editProduct,addPImg}