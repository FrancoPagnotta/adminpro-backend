/*
	Route: api/todo/:param
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getTodo, getCollectionData } = require('../controllers/searches');

const router = Router();




router.get('/:search', validateJWT, getTodo);
router.get('/collection/:table/:search', validateJWT, getCollectionData);



module.exports = router;