const express = require('express');
const router = express.Router();
const Presenca = require('../models/Presenca');

// GET / -> exibe o formulário na página inicial
router.get('/', (req, res) => {
  // Renderiza o arquivo views/index.ejs
  res.render('index'); 
});

// POST / -> recebe dados do formulário e salva no banco
router.post('/', async (req, res) => {
  try {
    // req.body = { nome: 'Fulano', presenca: 'on' (ou algo do tipo) }
    // Vamos assumir que o campo "presenca" vem como "on" quando marcado = presente
    const nome = req.body.nome;
    const presenca = req.body.presenca === 'on' ? true : false;

    await Presenca.create({ nome, presenca });
    // Redireciona para a lista
    res.redirect('/lista');
  } catch (error) {
    console.error(error);
    res.send('Erro ao salvar a presença.');
  }
});

// GET /lista -> lista todas as presenças
router.get('/lista', async (req, res) => {
  try {
    const presencas = await Presenca.find().sort({ data: -1 });
    // Renderiza o arquivo views/lista.ejs e passa os dados
    res.render('lista', { presencas });
  } catch (error) {
    console.error(error);
    res.send('Erro ao buscar presenças.');
  }
});

module.exports = router;
