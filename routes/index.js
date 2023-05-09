const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/* роутеры аддитивные, к написанному в точке входа будут добавляться адреса-маршруты */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.send({ message: 'запрашиваемой страницы не существует' }, 404);
});

module.exports = router;
