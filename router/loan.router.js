

// RUTA: /api/loan

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { setLoan, putLoan, delLoan, getLoans, getLoansByUID } = require("../controllers/loan.controller");


const router = Router();


router.get('/',getLoans);
router.get('/:id',getLoansByUID);

router.post('/', [ 
    check('origin','El nombre es obligatorio').not().isEmpty(),
    check('cant','Formato email erroneo').not().isEmpty(),
    validarCampos,
   //  validarJWT

 ],setLoan);

    router.put('/:id', [ 
        check('origin','El nombre es obligatorio').not().isEmpty(),
        check('cant','La cantidad es obligatoria').not().isEmpty(),
        validarCampos,
      //   validarJWT

     ],putLoan);

     router.delete('/:id',
        validarCampos,
        //validarJWT,
        delLoan);
        
module.exports = router;