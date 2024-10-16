// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Adicionar CORS

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON
app.use(express.json());

// Habilitar CORS para permitir requisições de outros domínios (como o frontend hospedado no GitHub Pages)
app.use(cors({
    origin: 'https://investimentsecurity.github.io',
}));

// Middleware de autenticação JWT
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

// Rota protegida (exemplo de rota protegida)
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo à Dashboard, usuário ID: ${req.user.id}` });
});

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


