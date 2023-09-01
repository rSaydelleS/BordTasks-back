function routes(app) {
    app.use('/users', require('./routes/users.js'));
    
    app.use('/teste', require('./routes/teste.js'))
    return;
}


module.exports = routes;  