# kc-node
Practica node de keepCoding, realizada con express Node y Mongo


Notas para el desarrollador:

Inicializar la base de datos:

```js
node initDB.js
```

Iniciar la app en Producción

```sh
npm start
```

En desarrollo

```sh
npm run dev
```

## API

### GET /api/anuncios/

Ejemplo de la petición

```json
{"results":[
  {
    "anuncios": [ 
      {
        "nombre": "Bicicleta", "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tags": [ "lifestyle", "motor"]
      }, 
      {
        "nombre": "iPhone 3GS", "venta": false,
        "precio": 50.00,
        "foto": "iphone.png",
        "tags": [ "lifestyle", "mobile"]
      }
    ]
  }
]}
```

Ejemplos ipos de filtros Permitidos
```
  http://localhost:3000/api/anuncios?skip=0&limit=10&pmin=10&pmax=2000&nombre=Bicicleta
  skip, limit = paginación
  pmin, pmax = precio minimo y máximo
  nombre,
  tags,
  venta = si esta en venta o no
```

### GET /api/tags/

Ejemplo de la petición a tags

{
  "results": [
    "work",
    "lifestyle",
    "motor",
    "mobile"
  ]
}
```