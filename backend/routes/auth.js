const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuário

// Rota de Cadastro (Signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se todos os campos foram preenchidos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }

        // Verificar se o email já está em uso
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Criar novo usuário
        user = new User({ name, email, password });

        // Hashear a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Salvar o usuário no banco de dados
        await user.save();

        // Criar token JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro no servidor, por favor tente novamente.' });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se todos os campos foram preenchidos
        if (!email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }

        // Verificar se o usuário existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Comparar a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Criar token JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor, por favor tente novamente.' });
    }
});

module.exports = router;