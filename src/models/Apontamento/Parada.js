const mongoose = require('mongoose');

const ParadaSchema = new mongoose.Schema({
  duracaoEmMinutos: {
    type: Number,
    required: true
  }
});

mongoose.model('Parada', ParadaSchema);

module.exports = ParadaSchema;
