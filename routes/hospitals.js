// Route: /api/users
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { 
	getHospitals, 
	createHospital, 
	updateHospital, 
	deleteHospital
	} = require('../controllers/hospitals');
const { fieldsValidations } = require('../middlewares/fields-validations');

const router = Router();

router.get('/', getHospitals);

router.post('/',
	[
		validateJWT,
		check('name', 'The name of the hospital is required').not().isEmpty(),
		fieldsValidations,
	], 
	createHospital);

router.put('/:id', updateHospital);

router.delete('/:id', deleteHospital);




module.exports = router;