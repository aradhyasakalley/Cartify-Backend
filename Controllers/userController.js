const User = require('../models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
 const getAllusers=async(req,res)=>{
    try {
        const user= await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

 }

 const add_User=async(req,res)=>{
    const {username , email, address,new_user,Number,role,rating}= req.body;
    const newUser = new User(req.body);
    try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    } catch (error) {
    res.status(400).json({message:error.message});
    }

  }

const login_user= async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.find({email});
  if(user)
  {
      const passwordmatch = await bcrypt.compare(password ,user.password);
      if(passwordmatch)
      { 
        const maxAge = 3 * 24 * 60 * 60;
        const token = jwt.sign({id} ,process.env.Token_Secret , {
        expiresIn:maxAge
        })
        return res.status(200).send(token);
      }
      throw Error('Incorrect Password');

  }
  throw Error('Incorrect email');
}

 const remove_User=async(req,res)=>{
    try {
        await res.reqUser.remove();
        res.status(200).json({ message: 'Deleted User' });
      } catch (err) {
        res.status(500).json({ message: err.message });
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
  } catch (err) {
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
      return res.status(500).json({ message: err.message });
    }
  
    res.reqUser = reqUser;
    next()
  }
 module.exports={
    getAllusers,add_User,modify_User,remove_User,findUser,login_user
 };