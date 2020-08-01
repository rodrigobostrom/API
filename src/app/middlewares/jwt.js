const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não enviado' });
  }

  const jwtParts = authHeader.split(' '); // array

  if (jwtParts.length !== 2) {
    return res.status(401).json({ erro: 'Token com formato invalido' });
  }

  const [scheme, token] = jwtParts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ erro: 'Token com prefixo inválido' });
  }

  // ESTRUTURA DE CONTROLE DE ERROS
  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ msg: 'Token com problema' });
  }
};
