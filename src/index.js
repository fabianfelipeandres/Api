'use strict'

var mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
var port = process.env.PORT || 8000;

//mongodb connection then y catch
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado mongo Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening en puerto', port));
