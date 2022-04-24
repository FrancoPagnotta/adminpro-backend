const { Router } = require('express');
const { 
	getDoctors, 
	createDoctor, 
	updateDoctor, 
	deleteDoctor 
} = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { fieldsValidations } = require('../middlewares/fields-validations');

const router = Router();


router.get('/', getDoctors);

router.post('/',
	[
		validateJWT, 
		check('name', 'The name is required').not().isEmpty(),
		check('hospital', 'The hospital is required').not().isEmpty(),
		fieldsValidations
	],
	createDoctor);

router.put('/:id', updateDoctor);

router.delete('/:id', deleteDoctor);





module.exports = router;