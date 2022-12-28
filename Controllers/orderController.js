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
        //   mailTransporter.sendMail(details,(err)=>{
        //     if(err)
        //      console.log('not sent' ,err.message)
        //     else
        //     // console.log('email sent')
        //   })
        res.status(200).json({order})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const cartOrder=async(req,res)=>{
    try {
        let prod,i=0,price=0
        const userData=req.user
        var cart=(userData.cart)
        if(cart.length===0)
        return res.status(200).json({message:'cart is empty'})
        for (const product of cart) {
            let p=cart[i].product
            prod=await Product.findById(p.prodId)
            if(prod.Quantity<p.Quantity)
            return res.status(400).json('product sold out')
            prod.Quantity-=p.Quantity
            prod.save()
            price+=p.Quantity*prod.prize
            let prodDetails={
            productName:prod.productName,
                        prodId:prod._id,
                        prize:prod.prize,
                        Quantity:p.Quantity
        }
        console.log(prodDetails)
        i++
        }
        req.user.cart=[]
        await req.user.save()
        res.status(200).json({message:'order placed',price:price})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports={directOrder,cartOrder}