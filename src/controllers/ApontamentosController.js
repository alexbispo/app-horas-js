const mongoose = require('mongoose');

const Apontamento = mongoose.model('Apontamento');

module.exports = {
  async index(_req, res) {
    const apontamentos = await Apontamento.find();

    return res.json(apontamentos);
  }
};
