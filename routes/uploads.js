// endpoint --> /api/upload/

const { Router } = require('express');
const { uploadFiles } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:collection/:id', validateJWT, uploadFiles);



module.exports = router;