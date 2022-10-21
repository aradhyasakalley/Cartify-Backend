const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        //required:true
    },
    address:{
        type:String,
       // required:true
    },
    new_user:{
        type:Boolean,
        //default:false
    },
    Number:{
        type:Number,
       // required:true
    },


},{timestamps:true}
)
const user=mongoose.model('User' ,userSchema);
module.exports= user