/*
	Route: api/todo/:param
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getTodo } = require('../controllers/searches');

const router = Router();




router.get('/:search', validateJWT, getTodo);



module.exports = router;