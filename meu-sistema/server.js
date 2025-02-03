require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Aqui você lê as variáveis de ambiente
const MONGO_URI = process.env.MONGO_URI; // mongodb+srv://...
const PORT = process.env.PORT || 3000;   // Se não tiver definido, usa 3000

console.log('PORT:', PORT);
console.log('MONGO_URI:', MONGO_URI);
// Conexão com o MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB');
})
.catch((err) => {
  console.error('Erro ao conectar no MongoDB:', err);
});

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para ler dados de formulários (req.body)
app.use(express.urlencoded({ extended: true }));

// Definir pasta de arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const presencaRoutes = require('./routes/presencaRoutes');
app.use('/', presencaRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
