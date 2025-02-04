const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now // Armazena data/hora atual automaticamente
  },
  presenca: {
    type: Boolean, // true para presente, false para ausente
    required: true
  }
});

module.exports = mongoose.model('Presenca', PresencaSchema, 'shiqse');
