// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db'); // Conexão com banco MongoDB
const jwt = require('jsonwebtoken');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Habilitar CORS para permitir requisições do frontend
app.use(cors());

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

// Rotas de autenticação
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

