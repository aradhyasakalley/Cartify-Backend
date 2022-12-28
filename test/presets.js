const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const dotenv = require('dotenv').config();
// const testProduct1ID = new mongoose.Types.ObjectId();



const testProduct1 = {
    _id:new mongoose.Types.ObjectId(),
    productName:'testProduct1',
    Description:{
        colour:'testColor1',
        brand:'testBrand1',
        warranty:true
  
    },
    prize:2467,
    isAvailable:true,
    Quantity:40

}

const testProduct2 = {
    _id:new mongoose.Types.ObjectId(),
    productName:'testProduct2',
    Description:{
        colour:'testColor2',
        brand:'testBrand2',
        warranty:true
  
    },
    prize:24671,
    isAvailable:true,
    Quantity:40

}

const testUser = {
    _id:new mongoose.Types.ObjectId(),
    username:'dummyuser',
    password:'dummyuserisbest',
    email:'smitdama09@gmail.com',
    address:'dummy address',
    new_user:true,
    Number:1234567880,
    role:'admin',
    rating:5,
    prodId:[testProduct1._id],
    tokens: [{token:jwt.sign({email:'smitdama09@gmail.com',role:this.role}, process.env.Token_Secret)}]
}


// const dbSet = async () => {
//     await User.deleteMany()
//     await Product.deleteMany()
//     await new User(testUser).save()
//     await new Course(testProduct).save()
// }

module.exports = {
   testUser,
    testProduct1,
    testProduct2
}