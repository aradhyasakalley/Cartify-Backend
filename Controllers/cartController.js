const User=require('../models/user')
const Product=require('../models/product');

const addProdtoCart=async(req,res)=>{
    const {prodId,Quantity}=req.body;
    const user=req.user;
    const prod=await Product.findById(req.body.prodId)
    if(!prod)
    res.status(404).json({message:'Product not found'})
    try {
        user.cart.prod=user.cart.concat(prod);
        await user.save();
        res.status(201).json({message:'added to cart',prod,user})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const removeProd=async(req,res)=>{
    try {
        const user=req.user;
        const {prodId}=req.body
        
}catch(error)
{
    res.status(400).json({message:error.message})
}
}

module.exports={addProdtoCart,removeProd}