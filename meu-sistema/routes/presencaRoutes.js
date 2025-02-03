const express = require('express');
const router = express.Router();
const Presenca = require('../models/Presenca'); // Model configurado para a coleção 'shiqse'

// Rota GET para exibir o formulário inicial
router.get('/', (req, res) => {
  try {
    res.render('index'); // Renderiza o arquivo views/index.ejs
  } catch (error) {
    console.error('Erro ao carregar o formulário:', error);
    res.status(500).send('Erro ao carregar o formulário.');
  }
});

// Rota POST para salvar dados no banco de dados
router.post('/', async (req, res) => {
  try {
    const { nome, presenca } = req.body; // Captura os dados do formulário
    const novaPresenca = new Presenca({
      nome,
      presenca: presenca === 'on', // Converte 'on' para true
    });

    await novaPresenca.save(); // Salva no banco
    console.log('Presença salva no MongoDB:', novaPresenca);

    res.redirect('/lista'); // Redireciona para a página de lista
  } catch (error) {
    console.error('Erro ao salvar presença no MongoDB:', error);
    res.status(500).send('Erro ao salvar a presença.');
  }
});

// Rota GET para listar todas as presenças
router.get('/lista', async (req, res) => {
  try {
    const presencas = await Presenca.find().sort({ data: -1 }); // Lista em ordem decrescente de data
    res.render('lista', { presencas }); // Renderiza views/lista.ejs com os dados
  } catch (error) {
    console.error('Erro ao buscar presenças no MongoDB:', error);
    res.status(500).send('Erro ao buscar presenças.');
  }
});

module.exports = router;
