/* сервер если запустился, то слушает порты (ручки). На бэке приложение запускает нода */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/auth');

const {
  validateLogin,
  validateUser,
} = require('./utils/validators');
const myError = require('./errors/errors');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

/* метод use позволяет использовать middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.post('/signin', celebrate(validateLogin), login);
app.post('/signup', celebrate(validateUser), createUser);

// авторизация
app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res) => {
  res.send({ message: 'запрашиваемой страницы не существует' }, 404);
});
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? myError.InternalServerMsg
        : message,
    });
  next();
});

/* прослушивание порта из первого параметра и колбэк, который выполнится при запуске приложения */
app.listen(3000, () => {
  console.log('Сервер запущен');
});
