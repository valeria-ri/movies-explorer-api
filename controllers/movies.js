const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { HTTP_STATUS_CREATED } = require('../utils/constants');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors/errors');

// получение сохранённых пользователем фильмов
const getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// удаление сохранённого фильма
const deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нет прав для удаления фильма');
      }
      return movie
        .deleteOne()
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Удаление фильма с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
