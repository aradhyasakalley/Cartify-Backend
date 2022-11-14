const express = require('express');
const mongoose = require('mongoose');
const morgan=require('morgan');
const app = express();
const dotenv=require('dotenv').config();
const userRoute = require('./routes/userRoute');
const productRoute  = require('./routes/productRoute');
//const dB_serverconnect= require('./dBconnect');
mongoose.connect(process.env.dBURL , {useNewUrlParser : true , useUnifiedTopology:true})
.then(()=>app.listen(3000, async()=>{
    try {
        console.log('Connected to Database');
        console.log('Connected to Port 3000');
        } 
    catch (error) {
        console.log('Error Occured' ,error);
        }
})
)
.catch((err)=>console.log(err));
const fileUpload=require('express-fileupload')
app.use(express.json());
app.use(morgan('tiny'));
//product router
app.use('/api/product' , productRoute);
//user route
app.use('/api/user' ,userRoute);
app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.static('upload'))
//404 page
app.use((req,res)=>{
    res.status(404).send("<p><h4>Oops!404 Error </h4></p>");
})

    

    