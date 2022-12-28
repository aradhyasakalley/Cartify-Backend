const router = require('express').Router();
const userController = require('../Controllers/userController');
const auth = require('../MIddleware/auth');
const cartController=require('../Controllers/cartController');
const orderController=require('../Controllers/orderController')
const {authRole} = require('../MIddleware/authRole');
const upload=require('../utils/multer')

//get all
router.get('/' , auth.verifytoken ,  userController.getAllusers);

//sign up new user 
router.post('/signup' , userController.add_User);

//login user
router.post('/login' ,userController.login_user)

//logout user
router.post('/logout',auth.verifytoken,userController.logout_user)

//logout user
router.post('/logoutAll',auth.verifytoken,userController.logout_user_all)

router.post('/uploadProfilePic',auth.verifytoken,upload.single('profilePic'),userController.upload_profilePic)
router.put('/removeProfilePic/:id',auth.verifytoken,userController.remove_profilePic);
//delete one
router.delete('/:id', auth.verifytoken, authRole('admin','seller'),  userController.remove_User);
//update one
router.patch('/:id', auth.verifytoken, userController.findUser, userController.modify_User);

router.post('/addToCart',auth.verifytoken,cartController.addProdtoCart)

router.post('/removeProd',auth.verifytoken,cartController.removeProd)
router.get('/getMyprod',auth.verifytoken,authRole('admin','seller' ),userController.getMyprod)

router.post('/directOrder',auth.verifytoken,orderController.directOrder)
router.post('/cartOrder',auth.verifytoken,orderController.cartOrder)
module.exports = router;