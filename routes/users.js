// Route: /api/users
const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { fieldsValidations } = require('../middlewares/fields-validations');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',validateJWT , getUsers);

router.post('/', 
	[
		check('name', 'Field name is required').not().isEmpty(),
		check('password', 'Field password is required').not().isEmpty(),
		check('email', 'Field email is required').isEmail(),
		fieldsValidations
	], createUser);

router.put('/:id',
	[	
		validateJWT,
		check('name', 'Field name is required').not().isEmpty(),
		check('email', 'Field email is required').isEmail(),
		check('role', 'Field role is required').not().isEmpty(),
		fieldsValidations
	] , updateUser);

router.delete('/:id',validateJWT , deleteUser);




module.exports = router;