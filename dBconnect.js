const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv').config();
const app= express();


const dB_serverconnect=mongoose.connect(process.env.dBURL , {useNewUrlParser : true , useUnifiedTopology:true})
.then(()=>app.listen(3000, async()=>{
    try {
        console.log('Connected to Database');
        console.log('Connected to Port 3000');
    } catch (error) {
        console.log('Error Occured' ,error);
    }
})
)
.catch((err)=>console.log(err));
module.exports=dB_serverconnect;


