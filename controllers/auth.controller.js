const { response } = require('express');
const Usuario = require('../model/usuario.model');
const cryp = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async ( req, res = response ) =>{
    const { email, password } = req.body;

    
        try{
            // verificar email
            const userDb = await Usuario.findOne({ email} );

            if(!userDb) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'Email o password erroneos'
                });
            }

            // verificar pass

            const validPs = cryp.compareSync(password, userDb.password);
            if(!validPs) {
                return res.status(404).json ({
                    ok:false,
                    msg: 'Email o password erroneos'
                });
            }

            //Geneterar token

            const token =  await generarJWT( userDb.id)
        return res.json({
            ok:true,
            token,
            usuario: userDb
        })
    } catch(error) {
        console.log("Login Ko")

        return res.status( 500 ).json({
            ok:false,
            msg: 'Error en logeo'
        })
    }
}

module.exports = { login }