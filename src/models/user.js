'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    email: String,
    trabajo: String,
    descripcion: String,
    comuna: String,
    direccion: String,
    telefono: Number,
    fecha: String,
    hora: String,
    fotos: [String]
});

module.exports = mongoose.model('User', UserSchema);