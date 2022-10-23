const router = require('express').Router();
const userController = require('../Controllers/userController');

//get all
router.get('/' , userController.getAllusers )
//get by name

//create one
router.post('/' , userController.add_User);

//delete one
router.delete('/:id', userController.findUser, userController.remove_User);
//update one
router.patch('/:id', userController.findUser, userController.modify_User);

module.exports = router;