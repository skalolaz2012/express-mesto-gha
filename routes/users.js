const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  validateUserId,
  validateEditUser,
  validateAvatar,
} = require('../utils/validators');
const {
  getAllUsers,
  getYourself,
  getUser,
  editUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getYourself);
usersRouter.get('/:userId', celebrate(validateUserId), getUser);
usersRouter.patch('/me', celebrate(validateEditUser), editUser);
usersRouter.patch('/me/avatar', celebrate(validateAvatar), changeAvatar);

module.exports = usersRouter;
