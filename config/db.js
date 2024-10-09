const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);

