const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtToken = require('../utils/constants')

const User = require('../models/user');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
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
      res.send({
        token: jwt.sign({ _id: user._id }, jwtToken, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
