const express = require("express");
require('dotenv').config();
const cors = require("cors");


const { dbConnection } = require("./database/config");
const port = process.env.PORT
//Crear el servidor express
const app = express();


//cofigurar CORS
app.use( cors() );

//Lectura y parseo del body

app.use( express.json())

//Base de datos
dbConnection();


// rutas

app.use( '/api/usuarios', require('./router/usuario.router'));
app.use( '/api/login', require('./router/auth.router'));
app.use( '/api/income', require('./router/income.router'));
app.use( '/api/loan', require('./router/loan.router'));



app.listen( port, ( ) => {
    console.log('Port: '+ port)
} )