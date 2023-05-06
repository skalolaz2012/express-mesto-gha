/* экспортируем модель со схемой в контроллер */
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const editUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  changeAvatar,
  editUser,
};
