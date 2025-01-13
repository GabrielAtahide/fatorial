// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa o CORS
const app = express();
const usuarioRoutes = require('./routes/usuariosRoutes');
const professorRoutes = require('./routes/professoresRoutes');
const authRoutes = require('./routes/authRoutes');
const aulaRoutes = require('./routes/aulasRoutes');
const matriculaRoutes = require('./routes/matriculasRoutes');
const pagamentoRoutes = require('./routes/pagamentosRoutes');

// Middleware para tratar JSON
app.use(express.json());

// Middleware para habilitar CORS - Permite que o front-end acesse a API
app.use(cors({
  origin: 'http://localhost:5173', // ou o domínio do seu frontend
  methods: ['GET', 'POST'],
}));
// Usando as rotas da API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/aulas', aulaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

