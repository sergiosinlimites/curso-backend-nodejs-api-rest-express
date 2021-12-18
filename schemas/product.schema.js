const { string } = require('joi');
const joi = require('joi');

const id = joi.string().uuid() // siempre primero se inicia por el tipo de campo
const name = joi.string().min(3).max(20);
const price = joi.number().min(1).strict();
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = joi.object({
  id: id.required(),
  name: name,
  price: price,
  image: image,
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
