const mongoose = require('mongoose');
const { UnauthorizedError } = require('../utils/errors/errors');
const { checkToken } = require('../utils/jwtAuth');
const { authRequiredMessage } = require('../utils/errors/errorMessages');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new UnauthorizedError(authRequiredMessage));
  }

  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new UnauthorizedError(authRequiredMessage));
  }

  req.user = {
    _id: new mongoose.Types.ObjectId(payload._id),
  };
  return next();
};

module.exports = auth;
