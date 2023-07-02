const { response } = require('express')
const cryp = require('bcryptjs')
const { validationResult } = require('express-validator')

const Loan = require('../model/loan.model')
const { generarJWT } = require('../helpers/jwt')

const getLoans = async(req,res) =>{

    const loans = await Loan.find();

    res.json({
        ok:true,
        loans
    }
    )
}
const getLoansByUID = async(req,res) =>{
    const  uid = req.params.id;
    const loans = await Loan.find({ uid })
    
    res.json({
        loans
    }
    )
}

const setLoan = async(req,res) =>{
    const { origin } = req.body;
    const exits = await Loan.findOne({ origin })
        if( exits ) {
            return res.status( 500 ).json({
                ok:false,
                msg: 'El asunto del ingreso ya existe'
            })
        }
        try{
            const loan = new Loan( req.body )
            loan.createAt = new Date();
            loan.uid = 
            await loan.save();
            const iID = await Loan.findOne({ origin })
            return res.json({
                ok:true,
                iID,
            })
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al crear ingreso'+error
                })
        }
}

const putLoan = async(req,res = response) =>{

    // Toda la parte de validar token y comprobar loan correcto iria aqui.
    const  uid = req.params.id;
    const { } = req.body;
        try{
            const loanDb = await Loan.findById( uid );
            if(!loanDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el loan con dicho id'
                });
            }
            //Actualizaciones
            const campos = req.body;
           const loanUpdate = await Loan.findByIdAndUpdate ( uid, campos, {new: true} )
           return res.json({
            ok:true,
            loanUpdate
        })
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al actualizar loan'
                })
        }
}

const delLoan = async(req,res = response) =>{

    const  uid = req.params.id;
    try{

        const userDb = await Loan.findById( uid );


            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el loan con dicho id'
                });
            }
            userDb.active = false;
            const usuarioUpdate = await Loan.findByIdAndUpdate ( uid, userDb, {new: true} )
            return res.json({
             ok:true,
             usuarioUpdate
         })

    } catch(error) {
        return res.status( 500 ).json({
            ok:false,
            msg: 'Error al actualizar loan'
        })
    }
}
module.exports = {
    setLoan,
    getLoans,
    getLoansByUID,
    putLoan,
    delLoan
}