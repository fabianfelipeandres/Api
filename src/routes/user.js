'use strict'

var express = require('express');
var UserController = require('../controllers/user');
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './src/uploads/users'});
//const carp_upload = multipart({ uploadCar: './src/uploads/users'+ })


var api = express.Router();

api.get('/probando-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/registro', UserController.saveUsers);
api.post('/upload', md_upload, UserController.uploadImage);


module.exports = api;