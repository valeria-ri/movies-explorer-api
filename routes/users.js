const router = require('express').Router();

const { validateUserInfo } = require('../middlewares/validate');

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

// роут получения информации о пользователе
router.get('/me', getCurrentUser);

// роут редактирования данных пользователя
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
