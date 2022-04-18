// Route: /api/users
const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users');
const { check } = require('express-validator');
const { fieldsValidations } = require('../middlewares/fields-validations');

const router = Router();

router.get('/', getUsers);
router.post('/', 
	[
		check('name', 'Field name is required').not().isEmpty(),
		check('password', 'Field password is required').not().isEmpty(),
		check('email', 'Field email is required').isEmail(),
		fieldsValidations
	], 
	createUser);




module.exports = router;