const app = require('../app');
const request= require('supertest');
const mongoose = require('mongoose');
const {testUser , testProduct1 ,testProduct2} = require('./presets');
const User = require('../models/user');
const Product = require('../models/product');
const env = require('dotenv').config();
const tk=testUser.tokens[0].token;

beforeAll(async ()=>{
  await mongoose.connect(process.env.dbURL , {useNewUrlParser : true , useUnifiedTopology:true});
})

beforeEach(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await new User(testUser).save();
  await new Product(testProduct1).save();
  await new Product(testProduct2).save();
});

afterAll(async() => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close()
});

  describe('POST product/uploadproduct' , ()=>{
    
  
    test('should upload the product' , async()=>{
  
        const res = await request(app).post('/api/product/')
        .set('authorization' , `Bearer ${tk}`)
        .send({
          productName:'dummyProduct',
          Description:{
          colour:'dummyColorColor2',
          brand:'dummyBrand2',
          warranty:true},
          prize:2467,
          isAvailable:true,
          Quantity:40
        })   
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe('savedProduct')
        
    })
  })


  describe('GET product/' , ()=>{

    test('should show the product' , async()=>{
  
        const res = await request(app).get('/api/product/')
        .set('authorization' , `Bearer ${tk}`);      
        expect(res.statusCode).toBe(200);
        
        
    })
  })

  
describe('PATCH product/:id/' , ()=>{
  
  test('should update the product' , async()=>{

      const res = await request(app).patch(`/api/product/${testProduct1._id}`)
      .send({productName:'changedname' , Quantity:245 })
      .set('authorization' , `Bearer ${tk}`);
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(res.body.productName).toEqual('changedname')
      expect(res.body.Quantity).toEqual(245)
      expect(JSON.stringify(res.body._id)).toBe(JSON.stringify(testProduct1._id))
  })
})

describe('DELETE product/:id/' , ()=>{
  
  test('should DELETE the product' , async()=>{

      const res = await request(app).delete(`/api/product/${testProduct1._id}`)
      // .send({username:'John' ,address:'new dummy address' })
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json; charset=utf-8'))
      expect(res.body.message).toEqual('Deleted product')
    
  })
})

describe('POST product/uploadProfilePic' , ()=>{
  
  test('should upload the product image' , async()=>{

      const res = await request(app).post('/api/product/uploadImage/'+testProduct1._id)
      .set('authorization' , `Bearer ${tk}`)
      .attach('Image' , ("E:/DBMS PRACTICALS/Resources/iphone14.jpg"))
      expect(res.statusCode).toBe(201)
      expect(res.body.message).toContain('File Uploaded');
  })
})

describe('POST product/compareProducts' , ()=>{
  
  test('should upload the product image' , async()=>{

      const res = await request(app).post('/api/product/compareProducts')
      .send({prodId1:testProduct1._id,prodId2:testProduct2._id})
      expect(res.statusCode).toBe(200)
  })
})

describe('GET product/:id' , ()=>{

  test('should show the product' , async()=>{

      const res = await request(app).get('/api/product/'+testProduct2._id)
      .set('authorization' , `Bearer ${tk}`);      
      expect(res.statusCode).toBe(201);
      expect(res.body.productName).toBe(testProduct2.productName);
      
  })
})

