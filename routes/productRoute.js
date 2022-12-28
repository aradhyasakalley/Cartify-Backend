const router = require('express').Router();
const productController = require('../Controllers/productController');
const auth=require('../MIddleware/auth');
const upload=require('../utils/multerBuffer')
const {authRole} = require('../MIddleware/authRole');
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })) ;
//get all
router.get('/' , auth.verifytoken , authRole('seller' ,'buyer','admin'),productController.show_product);
router.get('/:id' , auth.verifytoken , authRole('seller' ,'buyer','admin') ,productController.getproduct, productController.product_byID);
//create one
router.post('/' , [auth.verifytoken, authRole('admin' ,'seller' ,'buyer')],productController.add_product);
router.post('/uploadImage/:id',[auth.verifytoken,authRole('seller' ,'admin')],[upload,productController.product_Image])
//delete one
router.delete('/:id', auth.verifytoken, authRole('seller','admin','buyer'), productController.getproduct, productController.remove_product );
  
//update one
router.patch('/:id', auth.verifytoken, authRole('seller','admin'), productController.getproduct, productController.modify_product);
router.post('/compareProducts',productController.compareProducts)
module.exports=router;