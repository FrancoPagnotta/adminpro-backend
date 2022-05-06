/*
	Path: 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { fieldsValidations } = require('../middlewares/fields-validations');

const router = Router();

router.post('/', 
	[
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		fieldsValidations

	], login);

router.post('/google', 
	[
		check('token', 'The google token is required').not().isEmpty(),
		fieldsValidations

	], googleSignIn);






module.exports = router;