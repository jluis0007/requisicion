//DEFINIR RUTAS PRINCIPALES

const express = require('express');
const router = express.Router();// SOLO UTILIZAR LA FUNCION ROUTER

router.get('/', async (req, res) => {//AQUI REDIRIGE A MI RUTA INICIAL o PRINCIPAL
    //res.render('index');
    res.send('Hola mundo');
});

module.exports = router;