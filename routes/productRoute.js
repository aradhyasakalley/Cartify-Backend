const router = require('express').Router();
const productController = require('../Controllers/productController');
const auth=require('../Controllers/authcontroller');
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })) ;
//get all
router.get('/' , auth.verifytoken ,productController.show_product);
router.get('/:id' , auth.verifytoken , productController.getproduct, productController.product_byID);
//create one
router.post('/' , auth.verifytoken, productController.add_product);
//delete one
router.delete('/:id', auth.verifytoken, productController.getproduct, productController.remove_product );
  
//update one
router.patch('/:id', auth.verifytoken, productController.getproduct, productController.modify_product);

module.exports=router;