// CONFIGURAÇÃO DA API
require('dotenv').config();

const cors = require('cors');
const express = require('express');

require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./helper/logger');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));      //aceita o envio de arquivos

app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(morgan('dev'));
app.use(routes);

app.use((error, req, res) => {
  logger.error(error);
  return res.status(500).json({ erro: 'Houve um erro na API' });
});

app.listen(process.env.PORT || 3003, () =>
  logger.info(`API OK NA PORTA: ${process.env.PORT || 3003}`)
);
