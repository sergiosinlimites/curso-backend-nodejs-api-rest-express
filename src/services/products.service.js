const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  // Aquí se define toda la lógica y las interacciones transaccionales de nuestros datos.
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      });
    }
  }

  async create(body){
    const newProduct = {
        id: faker.datatype.uuid(),
        name: body.product_name,
        price: body.price,
        image: body.image
    }
    this.products.push(newProduct);
    return newProduct
  }

  async find(){
    if(this.products === undefined || null || 0 || false){
      throw new Error('Something happened with the server');
    }
    return this.products;
  }

  async findOne(id){
    // const total = this.getTotal();
    const product = this.products.find(item => item.id === id);
    if(product === undefined){
      throw boom.notFound(`El producto con el id ${id} no se ha encontrado`);
    }
    if(product.isBlocked) {
      throw boom.conflict('El producto está bloqueado');
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }; // el ...product es para mantener la información que no se cambia
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsService;
