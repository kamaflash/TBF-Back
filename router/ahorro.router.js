

// RUTA: /api/ahorro

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, setUsuario, putUsuario, delUsuario } = require("../controllers/usuario.controller");
const {  setAhorro, getAhorros, getAhorrosByUID, putAhorro, delAhorro } = require("../controllers/ahorro.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { renewToken } = require("../controllers/auth.controller");


const router = Router();


router.get('/',getAhorros);
router.get('/:id',getAhorrosByUID);

router.post('/', [ 
  //renewToken,
    check('origin','El nombre es obligatorio').not().isEmpty(),
    check('cant','Formato email erroneo').not().isEmpty(),
    validarCampos,
    // validarJWT

  
],setAhorro);

    router.put('/:id', [ 
        check('origin','El nombre es obligatorio').not().isEmpty(),
        check('cant','La cantidad es obligatoria').not().isEmpty(),
        validarCampos,
      //   validarJWT

     ],putAhorro);

     router.delete('/:id',
        validarCampos,
        //validarJWT,
        delAhorro);
        
module.exports = router;