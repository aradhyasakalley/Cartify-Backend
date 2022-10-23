const router = require('express').Router();
const Product = require('../models/product');
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })) ;
//get all
router.get('/' , async(req,res)=>{
    try {
        const product= await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})
router.get('/:id' ,getproduct, async(req,res)=>{
res.json(res.reqProduct);
})
//create one
router.post('/' , async(req,res)=>{
   //const createproduct=    Object.keys(Product.schema.paths);
   //console.log(createproduct)
   //createproduct=req.body;
   //const newProduct = new Product(createproduct);
   const {productName , Description, isAvailable,Quantity}= req.body;
   const newProduct = new Product({productName , Description, isAvailable,Quantity});
   try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
   } catch (error) {
    res.status(400).json({message:error.message});
   }

});
//delete one
router.delete('/:id', getproduct, async (req, res) => {
    try {
      await res.reqProduct.remove();
      res.json({ message: 'Deleted product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  
//update one
router.patch('/:id', getproduct, async (req, res) => {
  
    res.reqProduct.name = req.body.name;
    res.reqProduct.Description = req.body.Description;
    res.reqProduct.isAvailable = req.body.isAvailable;
    res.reqProduct.Quantity=req.body.isAvailable;
    try {
    const updatedproduct = await res.reqProduct.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})
//middleware function to get product object from id
async function getproduct(req, res, next) {
    let reqProduct
    try {
      reqProduct = await Product.findById(req.params.id)
      if (reqProduct == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.reqProduct = reqProduct;
    next()
  }
module.exports=router;