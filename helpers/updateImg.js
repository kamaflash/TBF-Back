
const fs = require('fs');
const Usuario = require('../model/usuario.model');



const updateImg = async(table, id, newNameFile) =>{
    switch( table ){
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            addImg(usuario, 'usuarios',newNameFile)
            return true;
            break;
        
    }
}

const addImg = async( data, table, newNameFile) => {
    const pathOld = `./upload/${table}/${data.img}`;
    if(fs.existsSync(pathOld)){
       fs.unlinkSync(pathOld);
    }
    data.img = newNameFile;
    await data.save();
}
module.exports = {
    updateImg
}