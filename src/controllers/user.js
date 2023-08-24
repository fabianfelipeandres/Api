'use strict'

var bcript = require('bcrypt-nodejs');
var User = require('../models/user');
const path = require('path');
const fs = require('fs');
const multipart = require('connect-multiparty');
// const jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({message: 'Probando accion del controlador user del Api Rest con Node y Mongo'});
}


//Controlar datos a ingresar en el formulario 
function saveUsers(req, res) {
    var user = new User(req.body);
    
    user.save()
        .then((savedUser) => {
            res.json(savedUser);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
}

function saveUser(req, res){
    var user = new User();
    
    var params = req.body;
    console.log(params);

    user.name = params.name;
    user.email = params.email;
    user.trabajo = params.trabajo;
    user.descripcion = params.descripcion;
    user.comuna = params.comuna;
    user.direccion = params.direccion;
    user.telefono = params.telefono;
    user.fecha = params.fecha;
    user.hora = params.hora;
    user.fotos = params.fotos;

    if(user.name != null && user.email != null && user.trabajo != null && user.descripcion != null){

        user.save()
        .then((user) => res.json(user))
        .catch((error) => res.json({ message: error }));
        
    }else{

        if(user.comuna != null && user.direccion != null && user.telefono){
            user.save()
            .then((user) => res.json(user))
            .catch((error) => res.json({ message: error }));
        }else{

    
            user.save()
            .then((user) => res.json(user))
            .catch((error) => res.json({ message: error }));
    
            if(user.fecha != null && user.hora != null){

                user.save()
                .then((user) => res.json(user))
                .catch((error) => res.json({ message: error }));

            }else{

    
                user.save()
                .then((user) => res.json(user))
                .catch((error) => res.json({ message: error }));
    
                if(user.fotos != null){

                    user.save()
                    .then((user) => res.json(user))
                    .catch((error) => res.json({ message: error }));

                }else{
    
                    user.save()
                    .then((user) => res.json(user))
                    .catch((error) => res.json({ message: error }));
                }
            }
        }
    }
}

function getUsers(req, res){

    User.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

function uploadImage(req, res){
    
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        console.log("file_path",file_path);
        var file_split = file_path.split('\\');
        console.log("file_split",file_split);
        var file_name = file_split[3];
        console.log("file_name",file_name);
        var exp_split = file_name.split('\.');
        console.log("exp_split",exp_split);
        var file_exp = exp_split[1];
        console.log("file_exp",file_exp);

        if(file_exp == 'png' || file_exp == 'jpg' || file_exp == 'gif'){

            User.findByIdAndUpdate({image: file_name})
            .then(user => {
                if(!user){
                    //res.status(500).send({message: 'Error al actualizar imagen'});
                    res.status(200).send({image: file_name});
                }
            });
        }else{
            res.status(200).send({message: 'Archivo no guardado en la Api'});
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res){

    const imageFile = req.params.imageFile;
    const path_file = './src/Api/uploads/users/'+imageFile;

    if(fs.existsSync(path_file))
    {
        res.sendFile(path.resolve(path_file));
    }else{
        res.status(200).send({message: 'No existe la imagen'});
    }
}

module.exports = {
    pruebas,
    saveUser,
    saveUsers,
    getUsers,
    uploadImage,
    getImageFile
};