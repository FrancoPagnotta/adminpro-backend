const { Router } = require('express');
const { 
	getDoctors, 
	createDoctor, 
	updateDoctor, 
	deleteDoctor 
	} = require('../controllers/doctors');

const router = Router();


router.get('/', getDoctors);

router.post('/', createDoctor);

router.put('/:id', updateDoctor);

router.delete('/:id', deleteDoctor);





module.exports = router;