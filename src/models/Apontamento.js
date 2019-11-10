const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ApontamentoSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: true
  },
  entrada: {
    type: String,
    required: true
  },
  saida: {
    type: String
  },
  pausas: [
    { duracao: String }
  ],
  totalEmMinutos: {
    type: Number
  },
  total: {
    type: String
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

ApontamentoSchema.plugin(mongoosePaginate);

mongoose.model("Apontamento", ApontamentoSchema);

module.exports = ApontamentoSchema;
