const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  // console.log(size);
  const limit = parseInt(size);
  const cities = [];
  for (let index = 0; index < (limit || 10); index++){
    cities.push({
      city_name: faker.name.title(),
      image: faker.image.imageUrl()
    });
  }
  res.json(cities);
});


router.get('/:lugarId', (req, res) => {
  const { lugarId } = req.params;
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
    }
  ]);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "He sido creado",
    data: body,
  });
});

router.patch('/:id', (req, res) => { // hay que pasarle el identificador del producto
  const { id } = req.params;
  const body = req.body;
  res.json({
    id,
    message: "Ha sido modificado",
    data: body
  });
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    message: 'Ha sido eliminado'
  });
});

module.exports = router;
