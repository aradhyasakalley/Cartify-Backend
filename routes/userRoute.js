const router = require('express').Router();
const userController = require('../Controllers/userController');
const auth = require('../MIddleware/auth');
const {authRole} = require('../MIddleware/authRole');


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

//delete one
router.delete('/:id', auth.verifytoken, authRole('admin'), userController.findUser, userController.remove_User);
//update one
router.patch('/:id', auth.verifytoken, userController.findUser, userController.modify_User);

module.exports = router;