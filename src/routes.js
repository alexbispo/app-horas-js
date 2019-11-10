const express = require('express');
const routes = express.Router();

const ApontamentosController = require('./controllers/ApontamentosController');

routes.get('/apontamentos', ApontamentosController.index);
routes.get('/apontamentos/:id', ApontamentosController.show);
routes.post('/apontamentos', ApontamentosController.create);
routes.delete('/apontamentos/:id', ApontamentosController.destroy);

module.exports = routes;
