'use strict';

const readline = require('readline');
const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');

async function main() {

  const continuar = await pregunta('Estas seguro, seguro, seguro, de que quieres borrar toda la base de datos y cargara datos iniciales');
  if (!continuar) {
    process.exit();
  }

  // inicializar la colección de Anuncios
  await initAnuncio();
  connection.close();

}

main().catch(err => console.log('Hubo un error:', err));

async function initAnuncio() {
  // borrar todos los documentos de Anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} Anuncios.`);

  // crear Anuncios iniciales
  const inserted = await Anuncio.insertMany([
    {
      "nombre": "Bicicleta", 
      "venta": true,
      "precio": 230.15,
      "foto": "bici.jpg",
      "tags": [ "lifestyle", "motor"]
    }, 
    {
      "nombre": "iPhone 3GS", 
      "venta": false,
      "precio": 50.00,
      "foto": "iphone.png",
      "tags": [ "lifestyle", "mobile"]
    }
  ]);
  console.log(`Creados ${inserted.length} Anuncios.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {

    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ifc.question(texto, respuesta => {
      ifc.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  });

}