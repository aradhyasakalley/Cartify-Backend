const router = require('express').Router();
const productController = require('../Controllers/productController');
const auth=require('../MIddleware/auth');
const upload=require('../utils/multerBuffer')
const {authRole} = require('../MIddleware/authRole');
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })) ;
//get all
router.get('/' , auth.verifytoken , authRole('seller' ,'buyer'),productController.show_product);
router.get('/:id' , auth.verifytoken , authRole('seller' ,'buyer') ,productController.getproduct, productController.product_byID);
//create one
router.post('/' , [auth.verifytoken, authRole('seller')],upload,productController.add_product);
//delete one
router.delete('/:id', auth.verifytoken, authRole('seller'), productController.getproduct, productController.remove_product );
  
//update one
router.patch('/:id', auth.verifytoken, authRole('seller'), productController.getproduct, productController.modify_product);
//router.post('/upload',upload,productController.product_Image)
module.exports=router;