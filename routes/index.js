const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/* роутеры аддитивные, к тому, что написано в точке входа будут добавляться адреса-маршруты */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', () => {
  return { message: 'ошибка на сервере' };
});

module.exports = router;
