const Presenca = require('../models/Presenca');

module.exports = {
  // Criar um registro
  async create(req, res) {
    try {
      // req.body = { nome: 'Fulano', presenca: true/false }
      const { nome, presenca } = req.body;
      const novo = await Presenca.create({ nome, presenca });
      return res.status(201).json(novo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Listar todos registros
  async getAll(req, res) {
    try {
      const presencas = await Presenca.find();
      return res.json(presencas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
