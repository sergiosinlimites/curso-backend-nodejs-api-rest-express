const express = require('express');
const cors = require('cors');
const routerAplicacion = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true); // dice que no hay error y que sí permite el acceso
    } else {
      callback(new Error('Not allowed'))
    }
  }
}
// app.use(cors()); // aquí se habilita a CUALQUIER dominio
app.use(cors(options)); // aquí se habilita SOLO a los dominios en la WHITELIST
//////

app.get('/', (req, res) => {
  res.send('Soy un servidor')
});

routerAplicacion(app);

// LOS MIDDLEWARES DE TIPO ERROR VAN DESPUÉS DE DEFINIR EL ROUTING
// importa el orden en como son llamados
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port is: ' + port);
});
