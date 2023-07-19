const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_KEY_ERROR = 11000;
const HTTP_STATUS_CREATED = 201;
const regexURL = /https?:\/\/(www\.)?[a-z0-9.-]+\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=]+/;

module.exports = {
  SALT_ROUNDS,
  MONGO_DUPLICATE_KEY_ERROR,
  HTTP_STATUS_CREATED,
  regexURL,
};
