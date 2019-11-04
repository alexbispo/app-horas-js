const mongoose = require('mongoose');

const SaidaSchema = new mongoose.Schema({
  hora: {
    type: Number,
    required: true
  },
  minuto: {
    type: Number,
    required: true
  }
});

mongoose.model('Saida', SaidaSchema);

module.exports = SaidaSchema;
