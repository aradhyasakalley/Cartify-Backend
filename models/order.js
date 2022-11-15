const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    userId:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    Number:{
        type:String
    },
    cart:[{
        product:{
            
        }
    }],
    totalPrize:{
        type:Number
    }
})