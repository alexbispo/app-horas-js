const mongoose = require('mongoose');

const ParadaSchema = new mongoose.Schema({
  duracaoEmMinutos: {
    type: Number,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Parada', ParadaSchema);

module.exports = ParadaSchema;
