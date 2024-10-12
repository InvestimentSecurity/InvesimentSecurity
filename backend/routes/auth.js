const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');  // Caminho correto para o modelo
const router = express.Router();

// Rota de cadastro (signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Validação dos campos
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
        }

        // Verificar se o usuário já existe (por email ou nome de usuário)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe com este email ou username' });
        }

        // Hashear a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro no cadastro:', error.message);
        res.status(500).json({ message: 'Erro no servidor, por favor tente novamente mais tarde.' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificação de campos
        if (!email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
        }

        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verificar se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Retornar mensagem de sucesso
        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no login:', error.message);
        res.status(500).json({ message: 'Erro no servidor, por favor tente novamente mais tarde.' });
    }
});

module.exports = router;



