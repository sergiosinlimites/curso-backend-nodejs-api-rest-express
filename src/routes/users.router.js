const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const size = req.query;
  const limit = parseInt(size, 10);
  const users = [];
  for (let i = 0; i < (limit || 10); i++){
    users.push({
      user_name: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      password: faker.internet.password()
    })
  }
  res.json(users)
})

router.get('/filter', (req, res) => {
  res.send('Soy un filtro')
})

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Sebastián Camilo',
    age: 22
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "Ha sido creado",
    data: body
  });
});

router.put('/:id', (req, res) => { // hay que pasarle el identificador del producto
  const { id } = req.params;
  const body = req.body;
  res.json({
    id,
    message: "Ha sido modificado",
    data: body
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    message: 'Ha sido eliminado'
  });
});

module.exports = router;
