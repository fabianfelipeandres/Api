'use strict'

const express = require('express');
var bodyParser = require('body-parser');

const app = express();

// Cargar Rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configura cabeceras http
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

// Rutas Base
// app.get('/pruebas', function(req, res){
//     res.status(200).send({message: 'Bienbenido'});
// });
app.use('/api', user_routes);

module.exports = app;