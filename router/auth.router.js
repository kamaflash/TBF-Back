
// RUTA: /api/login



const { Router } = require("express");
const { login, renewToken, loginGoogle, getUserByEmail } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/:email',getUserByEmail);
router.post('/', 
[ 
    check('email','Formato email erroneo').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
 ],
 login);
 
 router.post('/google', 
[ 
    check('token','Formato token erroneo').not().isEmpty(),
    validarCampos,
 ],
 loginGoogle);

 router.get('/renew',validarJWT,renewToken);


module.exports = router;