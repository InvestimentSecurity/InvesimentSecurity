// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path'); // Necessário para trabalhar com caminhos de arquivos
const connectDB = require('./config/db'); // Conexão com banco MongoDB
const jwt = require('jsonwebtoken');
const app = express();

// Habilitar CORS
app.use(cors({
    origin: 'https://investimentsecurity.github.io', // Permitir que o frontend hospedado no GitHub Pages acesse a API
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Pega o token do header Authorization
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token JWT
        req.user = decoded; // Anexa as informações decodificadas do usuário à requisição
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
