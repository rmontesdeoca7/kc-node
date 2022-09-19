const express = require('express');
const router = express.Router();
const {query, validationResult } = require('express-validator');
const Anuncio = require('../../models/Anuncio');

// GET /api/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
  try {

    // ejemplos de peticiones
    // http://localhost:3000/api/anuncios/?skip=2&limit=2&fields=name%20-_id
    // http://localhost:3000/api/anuncios/?sort=age%20-name
    // http://localhost:3000/api/anuncios?skip=0&limit=10&pmin=10&pmax=300

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
    res.json({ results: anuncios });

  } catch (err) {
    next(err);
  }
});

// TAGS
router.get('/tags', (req, res,) => {
  const tags = ['work', 'lifestyle', 'motor', 'mobile'];
  res.json({results: tags});
})


// GET /api/anuncios/(_id)
// Devuelve un anuncio
router.get('/:id', async (req, res, next) => {
  try {

    const _id = req.params.id;

    const anuncio = await Anuncio.lista({ _id: _id});

    res.json({ result: anuncio });

  } catch (error) {
    next(error);
  }
});

// PUT /api/anuncios/(_id)  (body)
// Actualizar un anuncio
router.put('/:id', async (req, res, next) => {
  try {

    const _id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Agente.findOneAndUpdate({ _id: _id }, data, {
      new: true
    });

    res.json({ result: anuncioActualizado });

  } catch (error) {
    next(error);
  }
});

// POST /api/anuncio (body)
// Crea un anuncio
router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const anuncio = new Anuncio(anuncioData);
    const anuncioGuardado = await anuncio.save();

    res.json({ result: anuncioGuardado });

  } catch (error) {
    next(error);
  }
});

// DELETE /api/anuncio/:_id
// Eliminar un anuncio
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncio.deleteOne({ _id: _id });

    res.json();

  } catch (error) {
    next(error);
  }
});

module.exports = router;