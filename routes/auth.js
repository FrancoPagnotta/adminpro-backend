/*
	Path: 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldsValidations } = require('../middlewares/fields-validations');

const router = Router();

router.post('/', 
	[
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		fieldsValidations

	], login);






module.exports = router;