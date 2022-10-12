const mongoose=require('mongoose');
const { stringify } = require('querystring');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    prodID:{
        type:Number,
        required:true
    },
    productName:{
        type:string,
        required:true
    },
    Description:{
        colour:{type:string,required:true},
        brand:{type:string,required:true},
        warranty:{type:Boolean,required:true,default:false}
  
    },
    isAvailable:{
        type:Boolean,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },


},{timestamps:true}
);
const product=mongoose.Model('product' ,productSchema);
module.exports= product;