const bcrypt = require('bcryptjs');
const mongoose = require('../../config/db');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Mostra data de criação e atualização do dado
  }

  // __V - Quantas vezes o dado foi atualizado - Incrementa 1 em cada atualização
);

UserSchema.pre('save', async function (next) {
  // Açoes vao ocorrer antes de determinado momento
  const hashPass = await bcrypt.hash(this.pass, 10);
  this.pass = hashPass;
  next(); // Prosseguir com a ação de salvar no banco de dados
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
