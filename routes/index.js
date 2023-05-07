const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const badRequest = () => {
  return { message: 'запрошенный ресурс не найден!' }
}

/* роутеры аддитивные, к тому, что написано в точке входа будут добавляться адреса-маршруты */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', badRequest);

module.exports = router;
