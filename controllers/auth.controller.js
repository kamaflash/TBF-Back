const { response } = require('express');
const Usuario = require('../model/usuario.model');
const cryp = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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
const renewToken = async(req, res = response) => {

    const uid = req.id;
    //Generar token 
    const token = await generarJWT( uid )
    const user = await Usuario.findById( uid );
    res.json({
        ok:true,
        token
    })
}

const loginGoogle = async ( req, res = response ) =>{
    
    try {
        const { email, name, picture} = await googleVerify( req.body.token);
        const usuarioDb = await Usuario.findOne({email});
        let usuario;
        if(!usuarioDb){
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google:true
            })
        } else {
            usuario = usuarioDb;
            usuario.google = true;
            // usuario.password = '@@@'
        }
        await usuario.save();
        //Generar token 
    const token = await generarJWT( usuario.uid )
            res.json({
                ok:true,
                email, name, picture,
                token
            })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg: 'TOken no es correcto',
        })
    }

    
    
}

const getUserByEmail = async(req,res) =>{
    const  email = req.params.email;
    const user = await Usuario.find({ email })
    
    res.json({
        user
    }
    )
}
module.exports = { login, renewToken, loginGoogle, getUserByEmail }