const usersRouter = require('./users');
const cardsRouter = require('./cards');

const router = require('express').Router();

/* роутеры аддитивные, то есть к тому, что написано в точке входа будут добавляться уточняющие адреса-маршруты */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter)

module.exports = router;
