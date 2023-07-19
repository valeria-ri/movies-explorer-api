const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SALT_ROUNDS, MONGO_DUPLICATE_KEY_ERROR } = require('../utils/constants');
const {
  validationErrorMessage,
  incorrectUserIdMessage,
  unauthorizedErrorMessage,
  notFoundUserMessage,
  conflictErrorMessage,
} = require('../utils/errors/errorMessages');

const { signToken } = require('../utils/jwtAuth');

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors/errors');

// регистрация пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(validationErrorMessage));
      } else if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictError(conflictErrorMessage));
      } else {
        next(err);
      }
    });
};

// логин пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(unauthorizedErrorMessage);
    })
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, isEqual]) => {
      if (!isEqual) {
        throw new UnauthorizedError(unauthorizedErrorMessage);
      }
      const token = signToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};

// получение данных о пользователе
const getCurrentUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(notFoundUserMessage);
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(incorrectUserIdMessage));
      } else {
        next(err);
      }
    });
};

// редактирование данных пользователя
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError(notFoundUserMessage);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(validationErrorMessage));
      } else if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictError(conflictErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  updateUserInfo,
};
