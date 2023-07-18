// RUTA: api/upload

const { Router } = require('express');
const { putUpload, getImg } = require('../controllers/upload.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload  = require('express-fileupload');

const router = Router();

router.use(fileUpload());
router.put('/:table/:id',validarJWT, putUpload);
router.get('/:table/:img',getImg);





module.exports = router