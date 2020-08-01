const routes = require('express').Router();
const userController = require('./app/controllers/UserController');
const validatorMid = require('./app/middlewares/validators');
const jwtMid = require('./app/middlewares/jwt');

routes.post('/users', validatorMid.userCreateValidator, userController.store);
routes.post('/login', userController.auth);

routes.use(jwtMid);

routes.delete('/users/:id', userController.destroy);
routes.put('/users', validatorMid.userUpdateValidator, userController.update);
routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);

module.exports = routes;
