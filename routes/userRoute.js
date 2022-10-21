const router = require('express').Router;
const user = require('./models/user');
app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;
//posting user
router.post('/postuser' , async(req, res)=>{
try{
    const userdata = req.body;
    const User= new user(userdata);
    const data = await User.save()
    res.write('<p><h4>The FOLLOWING USER WAS ADDED BY YOU<h4/><p/>');
    res.write.json(data);
    res.send();
}
catch(error){
    res.json({
        message: "Some error occurred",
        error,
      });
}
}
);
module.exports = router;