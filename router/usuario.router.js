

// RUTA: /api/usuarios

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, setUsuario, putUsuario, delUsuario } = require("../controllers/usuario.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();


router.get('/',getUsuarios);
router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Formato email erroneo').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT

 ],
    setUsuario);

    router.put('/:id', [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Formato email erroneo').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT

     ],putUsuario);

     router.delete('/:id',
        validarCampos,
        validarJWT,
        delUsuario);
        
module.exports = router;