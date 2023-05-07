const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errMsgNotFound = { message: 'id не существует' };

const selectErr = (data, res) => {
  if (!data) {
    res.status(NOT_FOUND).send(errMsgNotFound);
  }
}

module.exports = {
  OK,
  selectErr,
}