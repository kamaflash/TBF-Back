const { response } = require('express')
const cryp = require('bcryptjs')
const { validationResult } = require('express-validator')

const Income = require('../model/income.model')
const { generarJWT } = require('../helpers/jwt')

const getIncomes = async(req,res) =>{

    const incomes = await Income.find();

    res.json({
        ok:true,
        incomes
    }
    )
}
const getIncomesByUID = async(req,res) =>{
    const  uid = req.params.id;
    const incomes = await Income.find({ uid })
    
    res.json({
        incomes
    }
    )
}

const setIncome = async(req,res) =>{
    const { origin } = req.body;
    const exits = await Income.findOne({ origin })
        if( exits ) {
            return res.status( 500 ).json({
                ok:false,
                msg: 'El asunto del ingreso ya existe'
            })
        }
        try{
            const income = new Income( req.body )
            income.createAt = new Date();
            income.uid = 
            await income.save();
            const iID = await Income.findOne({ origin })
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

const putIncome = async(req,res = response) =>{

    // Toda la parte de validar token y comprobar income correcto iria aqui.
    const  uid = req.params.id;
    const { } = req.body;
        try{
            const incomeDb = await Income.findById( uid );
            if(!incomeDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el income con dicho id'
                });
            }
            //Actualizaciones

            const campos = req.body;
            // delete campos.password;
            // delete campos.google;
            // delete campos.email;

           const incomeUpdate = await Income.findByIdAndUpdate ( uid, campos, {new: true} )
           return res.json({
            ok:true,
            incomeUpdate
        })
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al actualizar income'
                })
        }
}

const delIncome = async(req,res = response) =>{

    const  uid = req.params.id;
    try{

        const userDb = await Income.findById( uid );


            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el income con dicho id'
                });
            }
            userDb.active = false;
            const usuarioUpdate = await Income.findByIdAndUpdate ( uid, userDb, {new: true} )
            return res.json({
             ok:true,
             usuarioUpdate
         })

    } catch(error) {
        return res.status( 500 ).json({
            ok:false,
            msg: 'Error al actualizar income'
        })
    }
}
module.exports = {
    setIncome,
    getIncomes,
    getIncomesByUID,
    putIncome,
    delIncome
}