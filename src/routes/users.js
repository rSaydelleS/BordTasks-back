var express = require('express');
var users = express.Router();
const conectarBancoDados = require('../Functions/tratarErrosEsperados')

/* GET users listing. */
users.get('/',conectarBancoDados, function(req, res, next) {
  res.send('respond with a resource aaaaaaaaaa');
});

module.exports = users;
