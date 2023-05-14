/* сервер если запустился, то слушает порты (ручки). На бэке приложение запускает нода */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const { celebrate, errors } = require('celebrate')

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  validateLogin,
  validateUser,
} = require('./utils/validators');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

/* метод use позволяет использовать middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.post('/signin', celebrate(validateLogin), login);
app.post('/signup', celebrate(validateUser), createUser);

// авторизация
app.use(auth);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});
app.use(router);

/* прослушивание порта из первого параметра и колбэк, который выполнится при запуске приложения */
app.listen(3000, () => {
  console.log('Сервер запущен');
});
