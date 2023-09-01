var express = require('express');
var test = express.Router();

test.get('/', function (req, res) {
    res.send(`
    `)
});

module.exports = test
