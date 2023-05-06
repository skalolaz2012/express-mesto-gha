const {
  getAllUsers,
  getUser,
  createUser,
  editUser,
  changeAvatar,
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
/* по запросу post на маршруте  / выполнится функция колбэка */
usersRouter.post('/', createUser);
usersRouter.patch('/me', editUser);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;
