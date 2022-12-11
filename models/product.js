const mongoose=require('mongoose');
//const { stringify } = require('querystring');
//const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    
    productName:{
        type:String,
        required:true
    },
    Description:{
        colour:{type:String,required:true},
        brand:{type:String,required:true},
        warranty:{type:Boolean,required:true,default:false}
  
    },
    prize:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Image:{
        type:Buffer
    }
},{timestamps:true}
);
const product=mongoose.model('product' ,productSchema);
module.exports= product;