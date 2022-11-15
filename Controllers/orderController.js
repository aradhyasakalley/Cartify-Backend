const User=require('../models/user')
const Product=require('../models/product')
const Order=require('../models/order')

const directOrder=async(req,res)=>{
    const {prodId,Quantity}=req.body
    try {
        const userData=req.user
        const prod=await Product.findById(prodId)
        if(req.body.Quantity>prod.Quantity)
        return res.status(200).json({message:'Product sold out!!!'})

       const price=prod.prize*req.body.quantity
       console.log(price)
        const order=new Order({
            userId:userData._id,
            username:userData.username,
            email:userData.email,
            address:userData.address,
            Number:userData.Number,
            totalPrize:price,
            cart:[{
                product:{
                        productName:prod.productName,
                        prodId:prod._id,
                        prize:prod.prize,
                        Quantity:req.body.Quantity
                }
            }]
        })
        prod.Quantity-=req.body.Quantity
        prod.save()
        res.status(200).json({order})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const cartOrder=async(req,res)=>{
    try {
        const userData=req.user
        const prod=await Product.findById(userData.cart.product.prodId)
        let price
        price+=(userData.cart.prize)*userData.cart.Quantity
        prod.Quantity-=userData.cart.Quantity
        prod.save()
        res.status(200).json({userData,prod,price})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports={directOrder,cartOrder}