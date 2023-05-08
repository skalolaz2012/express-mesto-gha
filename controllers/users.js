/* экспортируем модель со схемой в контроллер */
const User = require('../models/user');

const conditions = require('../utils/conditions');

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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(conditions.CREATED).send(user);
    })
    .catch((err) => {
      conditions.sortErrors(err, res)
    });
};

const editUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ user });
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
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  changeAvatar,
  editUser,
};
