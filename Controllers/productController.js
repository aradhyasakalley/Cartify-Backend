const Product = require('../models/product');
const user = require('../models/user');
const upload=require('../utils/multerBuffer')
const fs=require('fs')
const path=require('path')
const show_product=async(req,res)=>{
    try {
        const product= await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const product_byID= async(req,res)=>{
    res.status(201).json(res.reqProduct);
    }

const add_product=async(req,res)=>{
    
    const {productName , Description, isAvailable,Quantity}= req.body;
    //const newProduct = new Product({productName , Description, isAvailable,Quantity});
    const newProduct = new Product(req.body);
    try {
     const savedProduct = await newProduct.save();
     let productId=savedProduct._id
     await user.findByIdAndUpdate(req.user._id,{
      $addToSet:{
        prodId:productId
      }
     })
     req.user.save()
     res.status(201).json({message:'savedProduct'});
    } catch (error) {
     res.status(400).json({message:error.message});
    }
 }

 const product_Image=async(req,res)=>{
  try {
    let prod=await Product.findById(req.params.id);
    console.log(req.files)
    prod.Image=await (req.files)
    prod=await prod.save()
    //fs.unlinkSync(req.files);
    res.status(201).json({message:'File Uploaded',prod})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
 }

 const remove_product=async (req, res) => {
    try {
      await res.reqProduct.remove();
      res.status(200).json({ message: 'Deleted product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const modify_product=async (req, res) =>{
    try {
        let data=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//middleware function to get product object from id
    const getproduct=async(req, res, next)=> {
    let reqProduct
    try {
      reqProduct = await Product.findById(req.params.id)
      if (reqProduct == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.reqProduct = reqProduct;
    next()
  };

  const compareProducts=async(req,res,next)=>{
    try {
      const {prodId1,prodId2}=req.body
      const prod1=await Product.findById(req.body.prodId1)
      const prod2=await Product.findById(req.body.prodId2)
      res.status(200).json({prod1,prod2})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  module.exports={show_product,product_byID,add_product,remove_product,modify_product,getproduct,product_Image,compareProducts};