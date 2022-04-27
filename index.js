//Importar Express
const express = require('express');
const cors    = require('cors');
const { dbConection } = require('./db/config');
require ('dotenv').config();

//Crear servidor
const app = express();

// Base de datos
dbConection();

//Cors
app.use( cors() );

//Carpeta public
app.use( express.static('public') );


//Lectura y parseo del Body
app.use( express.json() );

//Rutas
app.use('/api/clientes', require('./routes/clientes'));




//Levantar la app de express
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }` );
})