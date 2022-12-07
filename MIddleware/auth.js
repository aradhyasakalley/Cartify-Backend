
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv=require('dotenv').config();
const verifytoken = async(req,res,next)=>{
    try{
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader)
    {
        const bearertoken = bearerHeader.split(' ')[1];
        const verifiedtoken = jwt.verify(bearertoken, process.env.Token_Secret);
        const user=await User.findOne({email:verifiedtoken.email});
        req.user= user;
        req.token=bearertoken;
        next();
    }
    else
    {
        res.status(403).send('Invalid Request');
    }
}
catch(err){
    res.status(400).send({error:err});
}
};
module.exports = {verifytoken};