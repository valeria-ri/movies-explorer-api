const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);

const signToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
  { expiresIn: '7d' },
);

module.exports = {
  checkToken,
  signToken,
};
