const express = require('express');
const router = express.Router();
const Presenca = require('../models/Presenca'); // Modelo da coleção

// Rota GET para exibir o formulário inicial
router.get('/', (req, res) => {
  try {
    res.render('index'); // Renderiza views/index.ejs
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
      data: new Date(), // Adiciona data automática ao registro
    });

    await novaPresenca.save(); // Salva no banco
    console.log('Presença salva no MongoDB:', novaPresenca);

    res.redirect('/lista'); // Redireciona para a página de lista
  } catch (error) {
    console.error('Erro ao salvar presença no MongoDB:', error);
    res.status(500).send('Erro ao salvar a presença.');
  }
});

// Rota GET para listar presenças separadas por pessoa
router.get('/lista', async (req, res) => {
  try {
    // Buscar todas as presenças no banco de dados
    const presencas = await Presenca.find();

    // Criar um objeto para armazenar listas separadas por nome
    const listasPorPessoa = {};

    // Agrupar presenças por nome
    presencas.forEach((p) => {
      if (!listasPorPessoa[p.nome]) {
        listasPorPessoa[p.nome] = []; // Criar um array para cada pessoa
      }
      listasPorPessoa[p.nome].push(p);
    });

    console.log("Listas separadas por pessoa:", listasPorPessoa); // Debug para ver a estrutura

    // Renderizar a página e enviar o objeto com as listas separadas
    res.render('lista', { listasPorPessoa });

  } catch (error) {
    console.error('Erro ao buscar presenças no MongoDB:', error);
    res.status(500).send('Erro ao buscar presenças.');
  }
});

module.exports = router;
