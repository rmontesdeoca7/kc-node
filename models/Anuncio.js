const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

anuncioSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  console.log('filtro', filtro);
  return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;