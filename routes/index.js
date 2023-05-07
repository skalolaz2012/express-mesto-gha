const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/* роутеры аддитивные, к тому, что написано в точке входа будут добавляться адреса-маршруты */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.patch('*', (req, res) => {
  res.send('запрашиваемой страницы не существует', 404);
});

module.exports = router;
