const User = require('../models/user');
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
   const newUser = new User({username , email, address,new_user,Number,role,rating});
   try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
   } catch (error) {
    res.status(400).json({message:error.message});
   }

 }

 const remove_User=async(req,res)=>{
    try {
        await res.reqUser.remove();
        res.json({ message: 'Deleted User' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

 }
 const modify_User=async(req,res)=>{

    res.reqUser.username = req.body.username;
    res.reqUser.email = req.body.email;
    res.reqUser.address = req.body.address;
    res.reqUser.new_user=req.body.new_user;
    res.reqUser.Number = req.body.Number;
    res.reqUser.role = req.body.role;
    res.reqUser.rating = req.body.rating;
    try {
    const updatedUser = await res.reqUser.save();
    res.json(updatedUser);
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
    getAllusers,add_User,modify_User,remove_User,findUser
 };