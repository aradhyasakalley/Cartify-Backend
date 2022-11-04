const router = require('express').Router();
const userController = require('../Controllers/userController');



//get all
router.get('/' , userController.getAllusers );

//sign up new user 
router.post('/signup' , userController.add_User);

//login user
router.post('/login' ,userController.login_user)

//delete one
router.delete('/:id', userController.findUser, userController.remove_User);
//update one
router.patch('/:id', userController.findUser, userController.modify_User);

module.exports = router;