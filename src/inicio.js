const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

// NO EN USO

app.get('/', (req, res) => {
  res.send(
    'Hello, this is a server');
});



app.get('/cities', (req, res) => {
  res.json([
    {
      id: 1,
      info: {
        nombre: "Juan Valdez",
        direccion: "Carrera 12 No 15 A"
      }
    }
  ])
})

app.get('/cities/:lugarId', (req, res) => { // los : significan que va a ser un parámetro
  const { lugarId } = req.params; // esta variable debe ser la misma que pusimos en el endpoint
  res.json([
    {
      lugarId,
      nombre: "Juan Valdez",
      direccion: "Carrera 12 No 15 A"
    },
    {
      lugarId,
      nombre: "Museo del Oro",
      direccion: "Carrera 7 No 24 B"
    },
  ]);
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  switch (categoryId) {
    case "1":
      res.json([
        {
          categoryId,
          productId
        }
      ]);
      break;
  }
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  res.json({
    limit,
    offset
  })
})

app.get('/products', (req, res) => {
  const { size } = req.query || 10;
  console.log(size);
  const limit = parseInt(size);
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push({
      product_name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
});

// CUIDADO CON COLOCAR LOS ENDPOINTS DINÁMICOS ANTES DE LOS ESPECÍFICOS
app.get('/users/filter', (req, res) => { // aqui funciona bien porque el específico /filter está antes del dinámico /:id, sino se confundirían
  res.send('Soy un filtro')
})


app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Sebastián Camilo',
    age: 22
  });
});

// ESTO ES LO QUE NO TOCA PONER DEBAJO
// app.get('/users/filter', (req, res) => { // aqui funciona bien porque el específico /filter está antes del dinámico /:id, sino se confundirían
//   res.send('Soy un filtro')
// })


app.listen(port, () => {
  console.log('My port is correct: ' + port);
});
