// endpoint --> /api/upload/

const { Router } = require('express');
const { uploadFiles, getFile } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:collection/:uid', validateJWT, uploadFiles);
router.get('/:collection/:image', validateJWT, getFile);



module.exports = router;