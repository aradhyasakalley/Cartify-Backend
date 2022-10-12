const express = require('express');
const mongoose = require('mongoose');
const morgan=require('morgan');
const app = express();
const dbURL= 'mongodb+srv://smitdama09:Ralip%40029@ecommerce.gykzgiy.mongodb.net/Ecommerce?retryWrites=true&w=majority';
mongoose.connect(dbURL , {useNewUrlParser : true , useUnifiedTopology:true})
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
    

