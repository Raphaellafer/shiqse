require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authRoutes');
const presencaRoutes = require('./routes/presencaRoutes');

const app = express(); // Criar o servidor Express

// 🔥 Middlewares para processar formulários e JSON
app.use(express.urlencoded({ extended: true })); // Processa dados do formulário (x-www-form-urlencoded)
app.use(express.json()); // Processa requisições JSON

// Middleware de sessão (para login)
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Tempo limite maior para encontrar o servidor
  socketTimeoutMS: 45000, // Tempo limite maior para operações de rede
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));


// Configuração do EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Importar as rotas depois dos middlewares
app.use(authRoutes);
app.use(presencaRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});