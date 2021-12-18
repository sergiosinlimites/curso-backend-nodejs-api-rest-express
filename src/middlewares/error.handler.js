function logErrors(err, req, res, next){
  //console.log('logErrors');
  //console.error(err);
  next(err);
}

function errorHandler(err, req, res, next){ // el next es fundamental para que sepa que es un middleware
  console.log('logErrors');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next){ // el next es fundamental para que sepa que es un middleware
  if(err.isBoom){
    const { output } = err; // boom tiene toda la info del error en el output
    res.status(output.statusCode).json(output.payload) // el payload es la información
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
