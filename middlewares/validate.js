const { celebrate, Joi } = require('celebrate');
const { regexURL } = require('../utils/constants');

// валидация данных регистрации пользователя
const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

// валидация данных логина пользователя
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация данных пользователя при их изменении
const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// валидация данных фильма при его создании
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexURL),
    trailerLink: Joi.string().required().pattern(regexURL),
    thumbnail: Joi.string().required().pattern(regexURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация id фильма
const validateMovieById = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUserInfo,
  validateCreateMovie,
  validateMovieById,
};
