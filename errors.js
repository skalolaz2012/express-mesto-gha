const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errMsgNotFound = { message: 'id не существует' };

// const selectErr = (data, res, next) => {
//   if (!data) {
//     res.status(NOT_FOUND).send(errMsgNotFound);
//   }
//   next();
// };

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  errMsgNotFound,
};
