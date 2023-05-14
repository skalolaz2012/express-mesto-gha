const jwt = require('jsonwebtoken');
const jwtToken = require('../utils/constants');
const { AuthError, AuthMsg } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(AuthMsg));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtToken);
  } catch (err) {
    next(new AuthError(AuthMsg));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
