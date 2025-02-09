const express = require('express');
const router = express.Router();
const Presenca = require('../models/Presenca'); // Modelo da coleção

// Middleware para garantir que o usuário está logado
function requireLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
}

// ✅ Rota GET para exibir o formulário inicial (somente usuários logados)
router.get('/', requireLogin, (req, res) => {
  res.render('index', { usuario: req.session.usuario });
});

// ✅ Rota POST para salvar presença no banco de dados
router.post('/', requireLogin, async (req, res) => {
  try {
    const nome = req.session.usuario.nome; // Obtém o nome do usuário logado
    const presenca = req.body.presenca === 'on'; // Converte checkbox para true/false

    const novaPresenca = new Presenca({
      nome,
      presenca,
      data: new Date() // Adiciona a data automaticamente
    });

    await novaPresenca.save();
    console.log('✅ Presença registrada no MongoDB:', novaPresenca);

    res.redirect('/lista'); // Redireciona para a lista de presenças
  } catch (error) {
    console.error('❌ Erro ao salvar presença no MongoDB:', error);
    res.status(500).send('Erro ao salvar a presença.');
  }
});

// ✅ Rota GET para listar presenças separadas por pessoa
router.get('/lista', requireLogin, async (req, res) => {
  try {
    const presencas = await Presenca.find();
    const listasPorPessoa = {};

    presencas.forEach((p) => {
      if (!listasPorPessoa[p.nome]) {
        listasPorPessoa[p.nome] = [];
      }
      listasPorPessoa[p.nome].push(p);
    });

    console.log("📌 Listas separadas por pessoa:", listasPorPessoa); // Debug

    res.render('lista', { listasPorPessoa, usuario: req.session.usuario });
  } catch (error) {
    console.error('❌ Erro ao buscar presenças no MongoDB:', error);
    res.status(500).send('Erro ao buscar presenças.');
  }
});

module.exports = router;
