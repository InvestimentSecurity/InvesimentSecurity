const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Rota de signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Verifique se o nome, email e senha foram fornecidos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
  }

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe com esse email!' });
    }

    // Hashear a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Salvar o usuário no banco de dados
    await newUser.save();

    // Gerar token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', token });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ message: 'Erro no servidor, por favor tente novamente mais tarde.' });
  }
});

module.exports = router;


