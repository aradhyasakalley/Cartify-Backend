const User = require('../models/user');
const Product=require('../models/product')
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const upload=require('../utils/multer');
const cloudinary=require('../utils/cloudinary');
const nodemailer=require('nodemailer');
const env = require('dotenv').config();
let mailTransporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})
 const getAllusers=async(req,res)=>{
    try {
        const user= await User.find();
        res.status(200).json(user);
        } 
        catch (error) {
        res.status(400).json({message:error.message});
        }

 }

 const add_User=async(req,res)=>{
    const {username , email, address,new_user,Number,role,rating}= req.body;
    const newUser = new User(req.body);
    try {
    const savedUser = await newUser.save();
    // let details={
    //   from:process.env.EMAIL_FROM,
    //   to:newUser.email,
    //   subject:"SIGNED UP!!! ElexCart",
    //   text:"confirmation email that u have created account in ElexCart from Devansh:)"
    // }
    // mailTransporter.sendMail(details,(err)=>{
    //   if(err)
    //   console.log(err.message)
    //   else
    //   console.log('email sent')
    // })
    return res.status(201).json(savedUser);
    } 

    catch (error) {
    return res.status(400).json({message:error.message});
    }

  };

const login_user= async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  try{
  if(user)
  {

      //console.log(user);
      //console.log(password , user.password );
      const passwordmatch = await bcrypt.compare(password ,user.password);
      if(passwordmatch)
      { 
        const maxAge = 3 * 24 * 60 * 60;
        const token = jwt.sign({email:user.email,role:user.role} ,process.env.Token_Secret , {
        expiresIn:maxAge
        })
        user.tokens=user.tokens.concat({token});
        await user.save();
        // let details={
        //   from:process.env.EMAIL_FROM,
        //   to:user.email,
        //   subject:"Logged In!!! ElexCart",
        //   text:"confirmation email that u have logged in ElexCart from Devansh :)"
        // }
        // mailTransporter.sendMail(details,(err)=>{
        //   if(err)
        //   console.log(err.message)
        //   else
        //   console.log('email sent')
        // })
        return res.header('Authorization' ,token).status(200).send({
          user:user,
          message:"login successful",
          token:token

        });
      }
      

  }
  throw Error('Incorrect email or Password');}
  catch (error){
    res.status(400).json({message:error.message});
  }
}

const logout_user=async(req,res)=>{
  try {
    const user=req.user;
    user.tokens=user.tokens.filter((token)=>{
      return token.token!==req.token;
    })
    await user.save();
    res.status(200).json({message:'Logged out'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const logout_user_all=async(req,res)=>{
  try {
    const user=req.user;
    user.tokens=[];
    await user.save();
    res.status(200).json({message:'Logged out Throughout'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

 const remove_User=async(req,res)=>{
    try {
        console.log(req.params.id);
        const data = await User.findByIdAndDelete(req.params.id);
        // await res.reqUser.remove();
        res.status(200).json({ message: 'Deleted User' });
      } catch (err) {
        res.status(600).json({ message: err.message });
      }

 }
 const modify_User=async(req,res)=>{

    if (req.body.username!=null)
    res.reqUser.username = req.body.username;
    if (req.body.email!=null)
    res.reqUser.email = req.body.email;
    
    if (req.body.address!=null)
    {res.reqUser.address = req.body.address;}
    if (req.body.new_user!=null)
    {res.reqUser.new_user=req.body.new_user;}
    if (req.body.Number!=null)
    {res.reqUser.Number = req.body.Number;}
    if (req.body.role!=null)
    {res.reqUser.role = req.body.role;}
    if (req.body.rating!=null)
    {res.reqUser.rating = req.body.rating;}
    try {
    const updatedUser = await res.reqUser.save();
    res.status(200).json(updatedUser);
    } 
    catch (err) {
    res.status(400).json({ message: err.message });
    }
  }

 //middleware to obtain user
  const findUser=async(req, res, next)=> {
    let reqUser
    try {
      reqUser = await User.findById(req.params.id)
      if (reqUser== null) {
        return res.status(404).json({ message: 'Cannot find User' });
      }
    } catch (err) {
      return res.status(600).json({ message: err.message });
    }
  
    res.reqUser = reqUser;
    next()
  }

  const upload_profilePic=async(req,res,next)=>{
    try {
      const result=await cloudinary.uploader.upload(req.file.path)
        let user=req.user
        //await User.updateOne({_id:user._id},{$set:{profilePic:result.url,cloudinaryId:result.public_id}})
        user.profilePic=result.url
        user.cloudinaryId=result.public_id
        await user.save()
        res.status(201).json({message:'Profile pic uploaded',user})
      }
     catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  const remove_profilePic=async(req,res)=>{
    try {
      const user=await User.findById(req.params.id);
      await cloudinary.uploader.destroy(user.cloudinaryId);
      await User.updateOne({_id:user._id},{$set:{profilePic:null,cloudinaryId:null}})
      res.status(200).json({message:'Profile pic removed'})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  const getMyprod=async(req,res)=>{
    try {
      console.log(req.user.prodId)
      const prod=await Product.find({_id:(req.user.prodId)})
      console.log('your prod is' , prod);
      res.status(200).json(prod)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
 module.exports={
    getAllusers,add_User,modify_User,remove_User,findUser,login_user,logout_user,logout_user_all,upload_profilePic,remove_profilePic,getMyprod
 };