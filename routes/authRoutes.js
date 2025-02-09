const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
  res.render('login'); // Criar a view login.ejs
});

// Processar login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(400).send('Credenciais inválidas.');
    }

    req.session.usuario = usuario; // Armazena o usuário na sessão
    res.redirect('/'); // Redireciona para o formulário após login

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro ao fazer login.');
  }
});

// Processar logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Página de cadastro (apenas para novos usuários)
router.get('/register', (req, res) => {
  res.render('register'); // Criar a view register.ejs
});

// Processar cadastro
router.post('/register', async (req, res) => {
    try {

    console.log("🔍 Dados recebidos no backend:", req.body); // Depuração
  

    const { nome, email, senha } = req.body;

    // Verifica se o usuário já existe
    if (await Usuario.findOne({ email })) {
      return res.status(400).send('E-mail já cadastrado.');
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res.redirect('/login'); // Redireciona para login após cadastro
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

module.exports = router;
