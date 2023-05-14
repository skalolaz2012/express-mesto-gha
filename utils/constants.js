const CREATED = 201;

const jwtToken = 'some-very-or-not-secret-key';
const pattern = /^(http|https):\/\/[^ "<>#%]+\.[^ "<>#%]+[^ "<>#%]+#?/;

module.exports = {
  CREATED,
  jwtToken,
  pattern,
};
