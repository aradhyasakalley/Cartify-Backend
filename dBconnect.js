const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv').config();
const app= express();


mongoose.connect(process.env.dbURL , {useNewUrlParser : true , useUnifiedTopology:true})
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err));

