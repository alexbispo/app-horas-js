const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

ApontamentoSchema.plugin(mongoosePaginate);

mongoose.model("Apontamento", ApontamentoSchema);

module.exports = ApontamentoSchema;
