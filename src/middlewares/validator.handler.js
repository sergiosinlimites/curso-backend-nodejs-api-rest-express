const boom = require("@hapi/boom");

function validatorHandler(schema, property){ // NECESITAMOS UN MIDDLEWARE DINÁMICO, YA QUE NO VAMOS A RECIBIR PRECISAMENTE DÓNDE ESTÁ LA DATA, (BODY, PARAMS, QUERY), SINO QUE MIRAREMOS DONDE ESTÁ LA PROPIEDAD Y CREAREMOS CON ELLO UN SCHEMA.
  return (req, res, next) => {
    const data = req[property]; // aquí le decimos que la info del request es dinámica y puede venir de varios lugares, si es post viene en body, si es get en params o query.
    const { error } = schema.validate(data, { abortEarly: false });
    if(error) {
      next(boom.badRequest(error));
    } else {
      next(); // sino que siga normal
    }
  }
}

module.exports = validatorHandler;
