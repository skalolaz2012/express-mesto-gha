const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  getYourself,
  editUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.get('/me', getYourself);
usersRouter.patch('/me', editUser);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;
