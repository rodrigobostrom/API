// CONFIGURAÇÃO DO BANCO DE DADOS

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
