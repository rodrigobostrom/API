const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

class UserController {
  // POST - CRIAR USUARIO
  async store(req, res) {
    const user = await userModel.create(req.body);

    user.pass = undefined;

    return res.status(201).json({ user });
  }

  // DELETE - DELETAR USUARIO
  async destroy(req, res) {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.json({ msg: 'Usuario Deletado com Sucesso' });
  }

  // PUT - ATUALIZAR USUARIO
  async update(req, res) {
    const { id } = req.params;

    delete req.body.pass;

    const user = await userModel.findOneAndUpdate(id, req.body, {
      new: true,
    });

    user.pass = undefined;

    return res.json({ user });
  }

  // GET COM ID - LISTAR UM USUARIO
  async show(req, res) {
    const { id } = req.params;
    const user = await userModel.findById(id);
    return res.json({ user });
  }

  // GET COM TODOS OS USUÁRIOS
  async index(req, res) {
    const users = await userModel.find();
    return res.status(200).json({ users });
  }

  async auth(req, res) {
    const { email, pass } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'Usuario nao existe!' });
    }

    const correctUser = await bcrypt.compare(pass, user.pass);

    if (!correctUser) {
      return res.status(401).json({ msg: 'Senha Inválida' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });

    return res.json({ token });
  }
}

module.exports = new UserController();
