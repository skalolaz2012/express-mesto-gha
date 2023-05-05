const { createUser } = require('../controllers/users')

const usersRouter = require('express').Router();

/* по запросу post на маршруте  / выполнится функция колбэка */
usersRouter.post('/', createUser);
// router.use('/cards', cardsRouter)

module.exports = usersRouter;