const express = require("express");
require('dotenv').config();
const cors = require("cors");


const { dbConnection } = require("./database/config");
const port = process.env.PORT
//Crear el servidor express
const app = express();


//Base de datos
dbConnection();


//cofigurar CORS
app.use( cors() );

// rutas
app.get('/',(req,res) =>{
    res.json({
        ok:true,
        msg: 'Hola'
    }
    )
})


app.listen( port, ( ) => {
    console.log('Port: '+ port)
} )