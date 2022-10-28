const express = require('express');
const mongoose = require('mongoose');
const morgan=require('morgan');
const app = express();

const dB_serverconnect= require('./dBconnect');
const userRoute = require('./routes/userRoute');
const productRoute  = require('./routes/productRoute');

app.use(express.json());
app.use(morgan('tiny'));


//product router
app.use('/api/product' , productRoute);
//user route
app.use('/api/user' ,userRoute);
//404 page
app.use((req,res)=>{
    res.status(404).send("<p><h4>Oops!404 Error </h4></p>");
})

    

    