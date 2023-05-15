const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const myError = require('../errors/errors');

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new myError.AlreadyExistError(myError.AlreadyExistMsg));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new myError.AuthError(myError.AuthMsg);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          next(new myError.AuthError('Неправильные почта или пароль'));
        }
        return res.send({
          token: jwt.sign({ _id: user._id }, 'jwtToken', { expiresIn: '7d' }),
        });
      });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
