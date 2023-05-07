/* сервер если запустился, то слушает порты (ручки). На бэке приложение запускает нода */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

/* метод use позволяет использовать middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '645621d3366c7241e97c28c3',
  };

  next();
});
app.use(function (req, res) {
  res.render('404', { status: 404, url: req.url });
});
app.use(function (err, res) {
  res.render('500', {
    status: err.status || 500,
    error: err,
  });
});

app.use(router);

/* прослушивание порта из первого параметра и колбэк, который выполнится при запуске приложения */
app.listen(3000, () => {});
