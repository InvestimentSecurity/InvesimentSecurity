const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de ter o modelo User
const router = express.Router();

// Rota de cadastro (signup)
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criar novo usuário
        user = new User({ username, email, password });

        // Hashear a senha
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Criar e retornar o token JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Erro no cadastro:', error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;


