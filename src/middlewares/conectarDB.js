const mongoose = require('mongoose');
const tratarErrosEsperados = require('../Functions/tratarErrosEsperados');

async function conectarBancoDados (req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("conectado ao banco de dados");
        try{next();}catch { };
        return mongoose;
    } catch (error) {
        console.error(error);
        tratarErrosEsperados('Error: Erro ao tentar se conectar com o Banco de Dados.')
        return error;
    }
}

module.exports = conectarBancoDados();