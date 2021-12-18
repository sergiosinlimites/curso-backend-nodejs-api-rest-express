const express = require('express');

const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../../schemas/product.schema');

const router = express.Router(); // SE CREA EL ROUTER
const service = new ProductsService; // SE CREA UNA INSTANCIA DE ESTE SERVICIO

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (err) {
    res.status(503).json({
      message: err.message
    })
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'), // se pueden colocar múltiples middlewares separados por comas, se hacen en orden.
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
      // res.status(404).json({
      //   message: err.message
      // });
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct); // esto solo será mandado si se crea un middleware, express tiene uno propio que se crea en la ruta principal, que se utiliza para recibir información en JSON
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  }
);

// modificar productos parcial con patch y totalmente con put

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => { // hay que pasarle el identificador del producto
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(202).json(product);
    } catch (err) {
      next(err)
      // res.status(404).json({
      //   message: err.message
      // })
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
});

module.exports = router; // SE EXPORTA EL ROUTER CON TODOS LOS ENDPOINTS

