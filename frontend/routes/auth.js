const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modelo MongoDB
const router = express.Router();

// Rota de Cadastro
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Gerar JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Gerar JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
