const myError = require('../errors/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? myError.InternalServerMsg : message,
  });
  next();
};
