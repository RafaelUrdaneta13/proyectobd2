const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/', (req, res)=>{
    res.render('Sede/Sedes.hbs');
 })

router.get('/add', (req, res)=> {
   res.render('Sede/add.hbs');

})

router.post('/add', (req, res)=>{
   res.send('recibido');
})

module.exports = router;