const { response } = require('express')
const cryp = require('bcryptjs')
const { validationResult } = require('express-validator')

const Ahorro = require('../model/ahorro.model')
const { generarJWT } = require('../helpers/jwt')

const getAhorros = async(req,res) =>{

    const ahorros = await Ahorro.find();

    res.json({
        ok:true,
        ahorros
    }
    )
}
const getAhorrosByUID = async(req,res) =>{
    const  uid = req.params.id;
    const ahorros = await Ahorro.find({ uid })
    
    res.json({
        ahorros
    }
    )
}

const setAhorro = async(req,res) =>{
    const { origin } = req.body;
    const exits = await Ahorro.findOne({ origin })
        if( exits ) {
            return res.status( 500 ).json({
                ok:false,
                msg: 'El asunto del ingreso ya existe'
            })
        }
        try{
            const ahorro = new Ahorro( req.body )
            ahorro.createAt = new Date();
            ahorro.uid = 
            await ahorro.save();
            const iID = await Ahorro.findOne({ origin })
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

const putAhorro = async(req,res = response) =>{

    // Toda la parte de validar token y comprobar ahorro correcto iria aqui.
    const  uid = req.params.id;
    const { } = req.body;
        try{
            const ahorroDb = await Ahorro.findById( uid );
            if(!ahorroDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el ahorro con dicho id'
                });
            }
            //Actualizaciones

            const campos = req.body;
            // delete campos.password;
            // delete campos.google;
            // delete campos.email;

           const ahorroUpdate = await Ahorro.findByIdAndUpdate ( uid, campos, {new: true} )
           return res.json({
            ok:true,
            ahorroUpdate
        })
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al actualizar ahorro'
                })
        }
}

const delAhorro = async(req,res = response) =>{

    const  uid = req.params.id;
    try{

        const userDb = await Ahorro.findById( uid );


            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el ahorro con dicho id'
                });
            }
            userDb.active = false;
            const usuarioUpdate = await Ahorro.findByIdAndUpdate ( uid, userDb, {new: true} )
            return res.json({
             ok:true,
             usuarioUpdate
         })

    } catch(error) {
        return res.status( 500 ).json({
            ok:false,
            msg: 'Error al actualizar ahorro'
        })
    }
}
module.exports = {
    setAhorro,
    getAhorros,
    getAhorrosByUID,
    putAhorro,
    delAhorro
}