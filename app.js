const express = require('express');
const mongoose = require('mongoose');
const morgan=require('morgan');
const app = express();
const dotenv=require('dotenv').config();
//const {dB_serverconnect}= require('./dBconnect');
//const userRoute = require('./routes/userRoute');
const productRoute  = require('./routes/productRoute');
//const user = require('./models/user');
app.use(express.json());
app.use(morgan('tiny'));
mongoose.connect(process.env.dBURL , {useNewUrlParser : true , useUnifiedTopology:true})
    .then(()=>app.listen(3000, async()=>{
        try {
            console.log('Connected to Database')
            console.log('Connected to Port 3000');
        } catch (error) {
            console.log('Error Occured' ,error);
        }
    })
    )
    .catch((err)=>console.log(err));
app.use('/api/product' , productRoute);
//404 page
app.use((req,res)=>{
    res.status(404).send("<p><h4>Oops!404 Error </h4></p>");
})

    

    