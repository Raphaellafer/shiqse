const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now  
  },
  presenca: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Presenca', PresencaSchema);
