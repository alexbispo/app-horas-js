const mongoose = require('mongoose');

const EntradaSchema = new mongoose.Schema({
  hora: {
    type: Number,
    required: true
  },
  minuto: {
    type: Number,
    required: true
  }
});

mongoose.model('Entrada', EntradaSchema);

module.exports = EntradaSchema;
