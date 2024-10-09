// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config({ path: '/Users/programacao/Documents/Investiment_Security/lux-login-signup/.env' });

const express = require('express');
const path = require('path'); // Necessário para trabalhar com caminhos de arquivos
const connectDB = require('./config/db'); // Conexão com banco MongoDB

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());
const jwt = require('jsonwebtoken');

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
        res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rota protegida
router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo à Dashboard, ${req.user.id}` });
});

module.exports = router;

// Serve arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Definir rotas de autenticação (login e signup)
app.use('/api/auth', require('./routes/auth'));

// Definir a porta do servidor, usando a variável de ambiente ou 5000 como padrão
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

