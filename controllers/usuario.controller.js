const { response } = require('express')
const cryp = require('bcryptjs')
const { validationResult } = require('express-validator')

const Usuario = require('../model/usuario.model')
const { generarJWT } = require('../helpers/jwt')
const getUsuarios = async(req,res) =>{

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios
    }
    )
}

const setUsuario = async(req,res) =>{
    const { email, password} = req.body;

    
        try{
            const exemail = await Usuario.findOne({ email })
            if(!exemail){
            const usuario = new Usuario( req.body )

                // Encriptr password
                const salt = cryp.genSaltSync();
                usuario.password = cryp.hashSync(password, salt)


            await usuario.save();
            const uID = await Usuario.findOne({ email })

            const token =  await generarJWT( uID.id)

            return res.json({
                ok:true,
                usuario,
                token
            })
            } else {
                return res.status( 400 ).json({
                    ok:false,
                    msg: 'Ese email ya existe.'
                })
            }
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al crear usuario'
                })
        }
}

const putUsuario = async(req,res = response) =>{

    // Toda la parte de validar token y comprobar usuario correcto iria aqui.

    const  uid = req.params.id;
    const { } = req.body;

    
        try{
            
            const userDb = await Usuario.findById( uid );

            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el usuario con dicho id'
                });
            }
            
            //Actualizaciones

            const campos = req.body;
            delete campos.password;
            delete campos.google;
            delete campos.email;

           const usuarioUpdate = await Usuario.findByIdAndUpdate ( uid, campos, {new: true} )
           return res.json({
            ok:true,
            usuarioUpdate
        })
        } catch (error) {
            return res.status( 500 ).json({
                    ok:false,
                    msg: 'Error al actualizar usuario'
                })
        }
}

const delUsuario = async(req,res = response) =>{

    const  uid = req.params.id;
    try{

        const userDb = await Usuario.findById( uid );

        
            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'No existe el usuario con dicho id'
                });
            }
            userDb.active = false;
            const usuarioUpdate = await Usuario.findByIdAndUpdate ( uid, userDb, {new: true} )
            return res.json({
             ok:true,
             usuarioUpdate
         })

    } catch(error) {
        return res.status( 500 ).json({
            ok:false,
            msg: 'Error al actualizar usuario'
        })
    }
}
module.exports = {
    getUsuarios,
    setUsuario,
    putUsuario,
    delUsuario
}