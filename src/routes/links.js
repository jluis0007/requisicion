const express = require('express');
const router = express.Router();

const pool = require('../database');//podría llamrse db en lugar de pool el nombre no importa


/****************    LINK ARTICULOS ***********************/
router.get('/articulos', async (req, res) => {
    const tipos = await pool.query('SELECT tipo FROM catalogos' );
    res.render('links/articulos', { tipos });
});
router.post('/articulos', async (req, res) => {
    const { tipo, articulo, foto } = req.body;
    const newArticulo = {
        tipo,
        articulo,
        foto
    };
    await pool.query('INSERT INTO articulos  set ?', [newArticulo]);
    req.flash('success', 'Article Saved Successfully');
    res.redirect('/links');
    //res.send(newArticulo);
});


router.get('/add', (req, res) => {// aqui esta la respuesta para el formulario 54:24
    res.render('links/add');// localhost:4000/links/add
   // res.send('Form');
});
router.get('/pedidos', (req, res) => {
    res.render('links/pedidos');
});





module.exports = router;