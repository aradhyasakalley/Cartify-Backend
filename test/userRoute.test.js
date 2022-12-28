const app = require('../app');
const request= require('supertest');
const mongoose = require('mongoose');
const {testUser , testProduct1,testProduct2} = require('./presets');
const User = require('../models/user');
const Product = require('../models/product');
const env = require('dotenv').config();
const tk=testUser.tokens[0].token;

beforeAll(async ()=>{
  await mongoose.connect(process.env.dbURL , {useNewUrlParser : true , useUnifiedTopology:true});
})

beforeEach(async () => {
  await User.deleteMany();
  await Product.deleteMany();
  await new Product(testProduct1).save();
  await new Product(testProduct2).save();
  await new User(testUser).save();
});

afterAll(async() => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close()
});

  
describe('/api/user/signup' , ()=>{

  beforeEach(async () => {
    await User.deleteMany();
});

test('should respond with 200 status code', async() => {

    const response = await request(app).post('/api/user/signup')
       .send({
        username:'testuser',
        password:'testuserisbest',
        email:'smitdama09@gmail.com',
        address:'test address',
        new_user:true,
        Number:1234567890,
        role:'seller',
        rating:5
    });
     expect(response.statusCode).toBe(201);
    
})
//should specify json in content type header
})

describe('/api/user/login', () => {
  it('should log the user in', async() => {
    const res = await request(app).post('/api/user/login')
    .send({
      email:testUser.email,
      password:testUser.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.token).toBeDefined();
  });
});

describe('PATCH user/:id/' , ()=>{
    test('should update the user' , async()=>{

      const res = await request(app).patch(`/api/user/${testUser._id}`)
      .send({username:'John' ,address:'new dummy address' })
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(res.body.address).toEqual('new dummy address')
      expect(res.body.username).toEqual('John')
      expect(JSON.stringify(res.body._id)).toBe(JSON.stringify(testUser._id))
  })
})

describe('GET user/api/' ,()=>{
  test('should return all users' ,async()=>{
    const res = await request(app).get('/api/user/')
    .set('authorization',`Bearer ${tk}`)
    expect(res.statusCode).toBe(200)
  })
})

describe('POST user/:id/' , ()=>{
    test('should DELETE the user' , async()=>{
      const res = await request(app).delete(`/api/user/${testUser._id}`)
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json; charset=utf-8'))
      expect(res.body.message).toEqual('Deleted User')
      })
})

describe('POST user/uploadProfilePic' , ()=>{
    test('should update the user' , async()=>{

      const res = await request(app).post('/api/user/uploadProfilePic')
      .set('authorization' , `Bearer ${tk}`)
      .attach('profilePic' , ("E:/DBMS PRACTICALS/Resources/iphone14.jpg"))
      expect(res.statusCode).toBe(201)
       expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))     
      expect(res.body.message).toContain('Profile pic uploaded');
  })
})

describe('GET user/api/getMyprod' ,()=>{
  test('should return all users' ,async()=>{
    const res = await request(app).get('/api/user/getMyprod')
    .set('authorization',`Bearer ${tk}`)
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
    // console.log(res);
    // expect(JSON.stringify(res.body._id)).toBe(JSON.stringify(testProduct1._id));
    // expect(JSON.stringify(res.body.productName)).toBe(JSON.stringify(testProduct1.productName));
  })
})

describe('POST user/:id/' , ()=>{
    test('should add to cart' , async()=>{

      const res = await request(app).post(`/api/user/addToCart`)
      .send({prodId:testProduct1._id ,Quantity:5 })
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json; charset=utf-8'))
      expect(res.body.message).toContain('added to cart');
  })
})


describe('POST user/cartOrder' , ()=>{
    test('should order  cart' , async()=>{

      await request(app).post(`/api/user/addToCart`)
      .send({prodId:testProduct1._id ,Quantity:5 })
      .set('authorization' , `Bearer ${tk}`)
      const res =  await request(app).post(`/api/user/cartOrder`)
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json; charset=utf-8'))
      expect(res.body.message).toContain('order placed');
  })
})

describe('POST user/directOrder' , ()=>{
    test('should order direct products' , async()=>{

      const res = await request(app).post(`/api/user/directOrder`)
      .send({prodId:testProduct1._id ,Quantity:5 })
      .set('authorization' , `Bearer ${tk}`)
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json; charset=utf-8'))
      expect(res.body.order._id).toBeDefined();
      expect(JSON.stringify(res.body.order.cart[0].product.prodId)).toEqual(JSON.stringify(testProduct1._id));
  })
})

describe('POST user/uploadProfilePic' , ()=>{
  test('should remove profile pic' , async()=>{

     await request(app).post('/api/user/uploadProfilePic')
    .set('authorization' , `Bearer ${tk}`)
    .attach('profilePic' , ("E:/DBMS PRACTICALS/Resources/iphone14.jpg"))
    const res = await request(app).put('/api/user/removeProfilePic/'+testUser._id)
    .set('authorization' , `Bearer ${tk}`)
    expect(res.statusCode).toBe(200)
     expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))     
    expect(res.body.message).toContain('Profile pic removed');
  })
})

describe('/api/user/logout', () => {
  it('should log the user out', async() => {
    await request(app).post('/api/user/login')
    .send({
      email:testUser.email,
      password:testUser.password
    });
    const res = await request(app).post('/api/user/logout')
    .set('authorization' , `Bearer ${tk}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Logged out');
    // expect(res.body.token).toBeDefined();
  });
});

describe('/api/user/logout', () => {
  it('should log the user out', async() => {
    await request(app).post('/api/user/login')
    .send({
      email:testUser.email,
      password:testUser.password
    });
    const res = await request(app).post('/api/user/logoutAll')
    .set('authorization' , `Bearer ${tk}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Logged out Throughout');
    const testuser = await User.findById(testUser._id)
    expect(testuser.tokens).toEqual([]);
    // expect(res.body.token).toBeDefined();
  });
});

