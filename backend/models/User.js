const mongoose = require('mongoose');

// Definir o esquema do usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // O email deve ser único
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true, // Se o username for necessário
        sparse: true // Usado para permitir múltiplos valores null no campo unique
    }
});

module.exports = mongoose.model('User', UserSchema);
