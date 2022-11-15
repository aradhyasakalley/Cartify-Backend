const User=require('../models/user')
const Product=require('../models/product');

const addProdtoCart=async(req,res)=>{
    const {prodId,Quantity}=req.body;
    const user=req.user;
    const prod=await Product.findById(req.body.prodId)
    if(!prod)
    return res.status(404).json({message:'Product not found'})
    
    if(req.body.quantity>prod.Quantity)
        return res.status(200).json({message:'Product sold out!!!'})

    try {
        //user.cart.product=(prod.Description+prod.productName+req.body.Quantity)
        await User.findByIdAndUpdate(user._id,{
            $addToSet:{
                cart:{
                    product:{
                        productName:prod.productName,
                        prodId:prod._id,
                        Description:{
                            colour:prod.Description.colour,
                            brand:prod.Description.brand,
                            warranty:prod.Description.warranty},
                        prize:prod.prize,
                        isAvailable:prod.isAvailable,
                    Quantity:req.body.Quantity
                        }
                }
            }
        })
       await user.save()
        res.status(201).json({message:'added to cart'})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const removeProd=async(req,res)=>{
    try {
        const user=req.user;
        const {prodId}=req.body
        user.cart=user.cart.filter((product)=>{
            return product.product.prodId!==req.body.prodId;})
            res.status(202).json({message:'removed from cart',user})
}catch(error)
{
    res.status(400).json({message:error.message})
}
}

module.exports={addProdtoCart,removeProd}