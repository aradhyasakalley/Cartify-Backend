const User=require('../models/user')
const Product=require('../models/product')
const Order=require('../models/order')
const nodemailer=require('nodemailer')
let mailTransporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"try.user99@gmail.com",
    pass:"juubuhmyejlursur"
  }
})
const directOrder=async(req,res)=>{
    const {prodId,Quantity}=req.body
    try {
        const userData=req.user
        const prod=await Product.findById(prodId)
        if(req.body.Quantity>prod.Quantity)
        return res.status(200).json({message:'Product sold out!!!'})

       const price=prod.prize*(Number(req.body.Quantity))
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
        let details={
            from:"try.user99@gmail.com",
            to:userData.email,
            subject:"Order Details",
            text:JSON.stringify(order)
            
                
          }
          mailTransporter.sendMail(details,(err)=>{
            if(err)
            console.log('not sent' ,err.message)
            else
            console.log('email sent')
          })
        res.status(200).json({order})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const cartOrder=async(req,res)=>{
    try {
        const userData=req.user
        const cart=(userData.cart)
        //console.log(cart)
        console.log(cart)
        const prod=await Product.findById(cart.product.prodId)
        console.log(prod)
        let price=0
        //console.log(prod.prize,Number(cart.Quantity))
        price+=Number(cart.prize)*(Number(cart.Quantity))
        prod.Quantity-=cart.Quantity
        prod.save()
        let prodDetails={
            productName:prod.productName,
                        prodId:prod._id,
                        prize:prod.prize,
                        Quantity:cart.Quantity
        }
        res.status(200).json({userData,prodDetails,price})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports={directOrder,cartOrder}