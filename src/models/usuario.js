const mongoose = require('mongoose');
const validator = require('validator');

const esquema = new mongoose.Schema(
    { //configurações do usuário
        nome: {
            type: String,
            required: 'é obrigatório!', //faz com que o campo seja obrigatório, o que está em '' é a mensagem que será exibida caso o
                                        //não preecha o campo
        },
        email: {
            type: String,
            unique: true, //faz com que tenha apenas um elemento com o valor digitado no campo no banco de dados
            required: 'é obrigatório!',
            lowercase: true, //faz com que tudo que seja digitado no campo seja minusculo
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                //essa função está pegando o valor digitado pelo usuário pelo parâmetro valorDigitado e retornando true ou false pelo
                //validator.isEmail true quando o campo é válido e false quando não é valido
                message: 'inválido!'
            }
        },
        senha: {
            type: String,
            required: 'é obrigatório!',
            select: false, //essa configuração determina se o campo vai ou não ser ocultado/transportado nas requisições de get
                           //false ele não aparece como opção do get e true aparece
        },
    },
    { //configurações do schema
        timestamps: true
        //essa configuração faz com que seja criado outros dois campos no final do schema, esse scampo possuem a data
        //de criação e a data de última alteração da informação do banco
    }
);

const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema);
module.exports = EsquemaUsuario;