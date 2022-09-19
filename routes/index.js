var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try{

    // filtros
    const {skip, limit, sort, fields, nombre, venta, tags, pmin, pmax} = req.query;
    const filtro = {}

    if (nombre) filtro.nombre = { $regex: '^'+nombre, $options: 'i'};
    if (venta) filtro.venta = venta;
    if (tags) filtro.tags = tags;
    if(pmin && pmax) filtro.precio = { '$gte': pmin, '$lte': pmax };
    if(pmin) filtro.precio = { '$gte': pmin};
    if(pmax) filtro.precio = { '$lte': pmax};

    const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);

    res.render('index', {
      results: anuncios,
      title: 'Anuncios'
    });
} catch (err) {
  next(err);
}
});

module.exports = router;
