const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* экспортируем модель со схемой в контроллер */
const User = require('../models/user');

const conditions = require('../utils/conditions');

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-very-or-not-secret-key', {
        expiresIn: '7d',
      });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res.status(401).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;
  
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // записываем хеш в базу
      })
    )
    .then((user) => {
      res.status(conditions.CREATED).send(user);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      conditions.checkData(user, res);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const editUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      conditions.checkData(user, res);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      conditions.checkData(user, res);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUser,
  changeAvatar,
  editUser,
};
