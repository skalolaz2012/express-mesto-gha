const OK = 200;
const CREATED = 201;
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
    return res.status(BAD_REQUEST).send(errMsgBadRequest);
  }
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send(errMsgBadRequest);
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND).send(errMsgNotFound);
  }
  return res.status(INTERNAL_SERVER_ERROR).send(errMsgServer);
};

module.exports = {
  checkData,
  sortErrors,
};
