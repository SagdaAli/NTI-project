const Category=require('../models/category.model')

const addCat=async(req,res)=>{
  try{
      const catData=new Category(req.body)
      await catData.save() 
      res.status(200).send({
        apiStatus:true,
        data:catData,
        message:"category added successfuly"
    })
  }
  catch(e){
    res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error in adding category"
    })
  }
}




module.exports={addCat}