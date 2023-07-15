const router = require('express').Router();

const {
  validateCreateMovie,
  validateMovieById,
} = require('../middlewares/validate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// роут сохранённых фильмов
router.get('/', getMovies);

// роут создания фильма
router.post('/', validateCreateMovie, createMovie);

// роут удаления сохранённого фильма по id
router.delete('/:_id', validateMovieById, deleteMovie);

module.exports = router;
