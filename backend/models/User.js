const mongoose = require('mongoose');

// Definir o esquema do usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Nome é obrigatório
    },
    username: {
        type: String,
        required: true,  // Nome de usuário é obrigatório
        unique: true,    // Nome de usuário deve ser único
    },
    email: {
        type: String,
        required: true,  // Email é obrigatório
        unique: true,    // Email deve ser único
    },
    password: {
        type: String,
        required: true,  // Senha é obrigatória
    }
});

// Exportar o modelo User
module.exports = mongoose.model('User', UserSchema);
