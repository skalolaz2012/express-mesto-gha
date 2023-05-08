const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errMsgNotFound = { message: 'id не существует' };
const errMsgBadRequest = { message: 'Переданы неправильные данные' };
const errMsgServer = { message: 'Ошибка сервера' };

const checkData = (data, res) => {
  if (!data) {
    return res.status(NOT_FOUND).send(errMsgNotFound);
  }
  return res.status(CREATED).send(data);
};

const sortErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send(errMsgBadRequest);
    return;
  }
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send(errMsgBadRequest);
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send(errMsgNotFound);
    return;
  } else {
    res.status(INTERNAL_SERVER_ERROR).send(errMsgServer);
    return;
  }
};

module.exports = {
  checkData,
  sortErrors,
};
