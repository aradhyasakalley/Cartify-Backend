const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt= require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:[true,'This email-id is already taken'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('You have entered invalid e-mail');
            }

        }
    },
    address:{
        type:String,
        required:true
    },
    new_user:{
        type:Boolean,
        default:false
    },
    Number:{
        type:Number,
        required:true,
        length:[10,'PLZ ENTER 10 DIGITS'],
        unique:[true,'This number is already registered'],
    },
    role:{
        type:String,
        required:true,
        enum:['buyer','seller']
    },
    rating:{
        type:Number,
        maxlength:[10 ,'Plz rate out of 10']
    }


},{timestamps:true}
)

userSchema.post('save' ,function(doc,next){
    console.log('New user was created' ,doc)
    next();
});

userSchema.pre('save' , async function(next){
    const salt= await bcrypt.genSalt(5);
    this.password=  await bcrypt.hash(this.password , salt)
    next();

})
const user=mongoose.model('User' ,userSchema);
module.exports= user