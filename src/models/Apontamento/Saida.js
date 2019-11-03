const mongoose = require('mongoose');

const SaidaSchema = new mongoose.Schema({
  hora: {
    type: Number,
    required: true
  },
  minuto: {
    type: Number,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Saida', SaidaSchema);

module.exports = SaidaSchema;
