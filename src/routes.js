const express = require('express');
const routes = express.Router();

const ApontamentosController = require('./controllers/ApontamentosController');

routes.get('/', ApontamentosController.index);

// routes.post('/apontamentos', (req, res) => {
//   console.log('params', req.body.dia);
//   res.status(201).end();
// });

module.exports = routes;
