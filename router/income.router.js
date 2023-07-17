

// RUTA: /api/income

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, setUsuario, putUsuario, delUsuario } = require("../controllers/usuario.controller");
const {  setIncome, getIncomes, getIncomesByUID, putIncome, delIncome } = require("../controllers/income.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { renewToken } = require("../controllers/auth.controller");


const router = Router();


router.get('/',[validarJWT],getIncomes);
router.get('/:id',[validarJWT],getIncomesByUID);

router.post('/', [ 
  //renewToken,
    check('origin','El nombre es obligatorio').not().isEmpty(),
    check('cant','Formato email erroneo').not().isEmpty(),
    validarCampos,
    validarJWT

  
],setIncome);

    router.put('/:id', [ 
        check('origin','El nombre es obligatorio').not().isEmpty(),
        check('cant','La cantidad es obligatoria').not().isEmpty(),
        validarCampos,
        validarJWT

     ],putIncome);

     router.delete('/:id',
     [validarJWT],
        delIncome);
        
module.exports = router;