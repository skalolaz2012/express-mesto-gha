const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* экспортируем модель со схемой в контроллер */
const User = require('../models/user');
const myError = require('../errors/errors');
const { CREATED, jwtToken } = require('../utils/constants');

const checkUser = (user, res) => {
  if (!user) {
    throw new myError.NotFoundError(myError.NotFoundMsg);
  }
  return res.send(user);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new myError.AuthError(myError.AuthMsg);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          next(new myError.AuthError(myError.AuthMsg));
        }
        const token = jwt.sign({ _id: user._id }, jwtToken, {
          expiresIn: '7d',
        });
        // вернём токен
        res.send({ token });
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
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

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => checkUser(user, res))
    .catch(next);
};

const getYourself = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const editUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUser,
  getYourself,
  changeAvatar,
  editUser,
};
