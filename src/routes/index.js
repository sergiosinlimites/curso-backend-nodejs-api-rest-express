const express = require('express');

const productsRouter = require('./products.router');
const citiesRouter = require('./cities.router');
const usersRouter = require('./users.router'); // se importan todos los routers

function routerAplicacion(app){
  const router = express.Router();
  app.use('/api/v1', router); // para que sea más mantenible la ruta principal en lugar de escribirlo en cada path
  router.use('/products', productsRouter);// le dice que cada ves que se use /products llamará a ese router
  router.use('/users', usersRouter);
  router.use('/cities', citiesRouter);

  /*
  Se pueden usar más router para las v2, v3, etc.
  const router2 = express.Router();
  app.use('/api/v1', router2);
  router2.use(......)
  */
}

module.exports = routerAplicacion;
