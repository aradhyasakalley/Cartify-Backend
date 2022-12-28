const authRole = (...permittedRole)=>{
    return (req,res,next)=>{
        validUser=req.user;
        role=req.user.role;
        if(validUser && permittedRole.includes(role))
        {
            console.log('allowed to pass')
            next();
        }
        else
        {
            res.status(403).json({Message:"You are forbidden for this request"});
        }
    }
}
module.exports={authRole};