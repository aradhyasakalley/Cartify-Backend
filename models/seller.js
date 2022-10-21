const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    sellerID:{
        type:Number,
        required:true
    },
    sellerName:{
        type:string,
        required:true
    },
    Description:{
        Address:{type:string,required:true},
        licenseNo:{type:string,required:true},
        sellerType:{type:string,required:true,default:retail},
        Contact:{
            website:{type:string},
            Number:{type:Number,required:true}
           
        }
  
    },
    
    Sales:{
        type:Number,
        required:true
    },


},{timestamps:true}
);
const seller=mongoose.Model('seller' ,sellerSchema);
module.exports= seller;