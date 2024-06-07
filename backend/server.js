const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão Mongo Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    console.error('Stack trace:', err.stack);
  });

// Arquivos estáticos frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota raiz - envia o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
