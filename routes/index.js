const router = require('express').Router();

const auth = require('../middlewares/auth')
const usersRouter = require('./users');
const cardsRouter = require('./cards');

/* роутеры аддитивные, к написанному в точке входа будут добавляться адреса-маршруты */
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, (req, res) => {
  res.send({ message: 'запрашиваемой страницы не существует' }, 404);
});

module.exports = router;
