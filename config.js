const { PORT = 3100, MONGODB_URL } = process.env;
const MONGODB_URL_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const SECRET_KEY = 'dev-secret';

module.exports = {
  PORT,
  MONGODB_URL,
  MONGODB_URL_DEV,
  SECRET_KEY,
};
