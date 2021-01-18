const express = require('express');
//const upload = require('../lib/storage');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'src/public/img/fotos' })
const pool = require('../database'); //podría llamrse db en lugar de pool el nombre no importa


/****************    ARTICULOS ***********************/
router.get('/articulos', async(req, res) => {
    const tipos = await pool.query('SELECT * FROM catalogos ORDER BY tipo');
    res.render('links/articulos', { tipos });
});
router.post('/articulos', upload.single('uploaded_file'), async(req, res, next) => {

    const resul = await pool.query('SELECT max(id) as maximo FROM articulos');
    let resultado = JSON.stringify(resul[0].maximo);
    resultado++;
    const foto = (resultado + '.' + req.file.mimetype.split('/')[1]);
    fs.renameSync(req.file.path, req.file.path.split('fotos')[0] + 'fotos/' + resultado + '.' + req.file.mimetype.split('/')[1]);
    const { tipo_id, articulo, descripcion } = req.body;
    const newArticulo = {
        tipo_id,
        articulo,
        descripcion,
        foto
    };
    res.send(newArticulo);
    await pool.query('INSERT INTO articulos  set ?', [newArticulo]);
    req.flash('success', 'Article Saved Successfully');
    res.redirect('/links');
});

/****************** TIPOS  ************************************/
router.get('/tipos', async(req, res) => {
    const tipos = await pool.query('SELECT * FROM catalogos ORDER BY tipo');
    res.render('links/tipos', { tipos });
});
router.post('/tipos', async(req, res) => {

    const { tipo } = req.body;
    const newTipo = {
        tipo
    };
    // console.log(newTipo);
    // res.send(newTipo);
    await pool.query('INSERT INTO catalogos  set ?', [newTipo]);
    req.flash('success', 'Type Saved Successfully');
    res.redirect('/Tipos');
});

/****************** DEPARTAMENTOS  ************************************/
router.get('/departamentos', async(req, res) => {
    const departamentos = await pool.query('SELECT * FROM departamentos ORDER BY depto');
    res.render('links/departamentos', { departamentos });
});
router.post('/tipos', async(req, res) => {

    const { depto } = req.body;
    const newDepto = {
        depto
    };
    // console.log(newTipo);
    // res.send(newTipo);
    await pool.query('INSERT INTO departamentos  set ?', [newDepto]);
    req.flash('success', 'Departament Saved Successfully');
    res.redirect('/departamentos');
});

/****************** PEDIDOS  ************************************/
router.get('/pedidos', async(req, res) => {
    const tipos = await pool.query('SELECT * FROM catalogos ORDER BY tipo');
    const articulos = await pool.query('SELECT * FROM articulos ORDER BY articulo');
    // let today = new Date();
    // let year1 = today.getFullYear();
    // let year2 = year1 + 1;
    // const newYears = [year1, year2];
    // const meses = [Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre];
    res.render('links/pedidos', { tipos, articulos });
});
router.post('/pedidos', async(req, res) => {
    let estatus = 0;
    let user_id = 2;
    const { articulo_id, anio, mes, cantidad } = req.body;
    const newDepto = {
        articulo_id,
        anio,
        mes,
        cantidad,
        estatus,
        user_id
    };
    // console.log(newTipo);
    // res.send(newTipo);
    await pool.query('INSERT INTO departamentos  set ?', [newDepto]);
    req.flash('success', 'Shipment Saved Successfully');
    res.redirect('/pedidos');
});

router.get('/add', (req, res) => { // aqui esta la respuesta para el formulario 54:24
    res.render('links/add'); // localhost:4000/links/add
    // res.send('Form');
});
router.get('/pedidos', (req, res) => {
    res.render('links/pedidos');
});





module.exports = router;