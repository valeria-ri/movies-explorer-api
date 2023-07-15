const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validate');

const {
  createUser,
  loginUser,
} = require('../controllers/users');

// роут регистрации
router.post('/signup', validateSignup, createUser);
// роут логина
router.post('/signin', validateSignin, loginUser);

// авторизация
router.use(auth);

// роут пользователей
router.use('/users', userRouter);
// роут фильмов
router.use('/movies', movieRouter);

module.exports = router;
