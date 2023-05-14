const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  validateEditUser,
  validateAvatar,
  validateUserId,
} = require('../utils/validators');
const {
  getAllUsers,
  getUser,
  getYourself,
  editUser,
  changeAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', celebrate(validateUserId), getUser);
usersRouter.get('/me', getYourself);
usersRouter.patch('/me', celebrate(validateEditUser), editUser);
usersRouter.patch('/me/avatar', celebrate(validateAvatar), changeAvatar);

module.exports = usersRouter;
