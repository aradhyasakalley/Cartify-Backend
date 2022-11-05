
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv').config();
const verifytoken = async(req,res,next)=>{
    try{
    const bearerHeader = req.headers['Authorization'];
    console.log(bearerHeader);
    if(bearerHeader)
    {
        const bearertoken = bearerHeader.split(' ')[1];
        const verifiedtoken = jwt.verify(bearertoken, process.env.Token_Secret);
        req.user= verifiedtoken;
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