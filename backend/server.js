// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors'); // Habilitar CORS
const jwt = require('jsonwebtoken');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Habilitar CORS para aceitar requisições de diferentes origens
app.use(cors({ origin: 'https://investimentsecurity.github.io' }));

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas de autenticação (login e signup)
app.use('/api/auth', require('./routes/auth'));

// Rota protegida (Exemplo de Dashboard protegida por autenticação)
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo à Dashboard, usuário ID: ${req.user.id}` });
});

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


