const mongoose = require('mongoose');

const Apontamento = mongoose.model('Apontamento');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const apontamentos = await Apontamento.paginate({}, { page, limit: 10 });

    return res.json(apontamentos);
  },

  async show(req, res) {
    const apontamento =  await Apontamento.findById(req.params.id);

    return res.json(apontamento);
  },

  async create(req, res) {
    const apontamento = await Apontamento.create(req.body);

    return res.status(201).json(apontamento);
  },

  async destroy(req, res) {
    const query = { _id: req.params.id };
    const retorno = await Apontamento.deleteOne(query);

    if (retorno.deletedCount === 0) {
      return res.status(404).end();
    }

    return res.status(204).end();
  }
};
