const fs = require('fs')
const { response } = require('express')
const { v4: uuidv4 } = require('uuid')

const { updateImg } = require('../helpers/updateImg')
// 
const  path  = require('path')


const putUpload = async(req,res = response) =>{
    const table = req.params.table || 0;
    const id = req.params.id || 0;

    const typeValid = ['incomes','usuarios','loans']
    try{
        if( !typeValid.includes(table) ) {
            return res.status(400).json({
                ok:false,
                msg:'No es ni medico, ni usuario, ni hospital '
            })
        }
        if( !req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok:false,
                msg:'No hay archivo a subir '
            })
        }



        const file = req.files.imagen;

        //Comprobar nombre y extension del archivo
        const nameFile = file.name.split('.')
        const extension = nameFile [nameFile.length -1];

        const extValid = ['png', 'jpg', 'jpeg', 'giff'];
        if ( !extValid.includes( extension) ) {
            return res.status(400).json({
                ok:false,
                msg:'No es una extension de imagen '
            })
        }

        //Generar nuevo nombre al archivo
        const newNameFile = `${uuidv4()}.${extension}`

        //Paht donde guardar la imagen
        const path =`./upload/${table}/${newNameFile}`;
        //Mover imagen
        file.mv(path, (err) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    ok:false,
                    msg:'Error al mover'
                });
            } 
            res.json({
                ok:true,
                newNameFile
            })
        });

        updateImg( table, id, newNameFile);
        
    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const getImg = ( req, res = response) => {
    const tipo = req.params.table;
    const img = req.params.img;

    const pathImg = path.join(__dirname,`../upload/${tipo}/${img}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
     } else {
        const pathImg = path.join(__dirname,`../upload/no-img.jpg`);
        res.sendFile(pathImg);
     }
    
}
module.exports = {
    putUpload,
    getImg
}