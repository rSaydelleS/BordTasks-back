const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = { customCssUrl: '/swagger-ui.css'}
const routes = require('./src/routes.js');
const authDocProducao = require('./src/middlewares/authDoc.js');
const app = express();
require('dotenv').config();

/*importações necessárias para rodar o projeto. */

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*configuração do express */


if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res) => {/*#swagger.ignore = true */ res.redirect('/doc')});
    app.use('/doc', authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
};
/*configuração da documentação feita pelo swagger */

routes(app);
/*endpoints da API */


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
/*Inicialização do servidor */

module.exports = app;
