const mongoose = require('mongoose');

const EntradaSchema = require('./Entrada');
const SaidaSchema = require('./Saida');
const ParadaSchema = require('./Parada');


const ApontamentoSchema = new mongoose.Schema({
  dia: {
    type: Date,
    required: true
  },
  entrada: EntradaSchema,
  saida: SaidaSchema,
  paradas: [ParadaSchema],
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Apontamento", ApontamentoSchema);

module.exports = ApontamentoSchema;
