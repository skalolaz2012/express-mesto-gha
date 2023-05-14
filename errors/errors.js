const { AlreadyExistError, AlreadyExistMsg } = require('./already-exist-error');
const { BadRequestError, BadRequestMsg } = require('./bad-request-error');
const { ForbiddenError, ForbiddenMsg } = require('./forbidden-error');
const { InternalServerError, InternalServerMsg } = require('./internal-server-error');
const { NotFoundError, NotFoundMsg } = require('./not-found-error');

module.exports = {
  AlreadyExistError,
  AlreadyExistMsg,
  BadRequestError,
  BadRequestMsg,
  ForbiddenError,
  ForbiddenMsg,
  InternalServerError,
  InternalServerMsg,
  NotFoundError,
  NotFoundMsg,
};
