// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db'); // Conexão com MongoDB
const cors = require('cors');
const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Ativar CORS para permitir requisições do frontend
app.use(cors({ origin: '*' }));

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas de autenticação (login e signup)
app.use('/api/auth', require('./routes/auth'));

// Rota protegida (Exemplo de Dashboard protegida por autenticação)
app.get('/api/dashboard', (req, res) => {
    res.json({ message: 'Bem-vindo à Dashboard protegida!' });
});

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
