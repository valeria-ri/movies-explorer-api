// BadRequest (400)
const validationErrorMessage = 'Переданы некорректные данные';
const incorrectUserIdMessage = 'Некорректный id пользователя';
const incorrectMovieIdMessage = 'Некорректный id фильма';

// Unauthorized (401)
const unauthorizedErrorMessage = 'Неверный email или пароль';
const authRequiredMessage = 'Пользователь не авторизован';

// Forbidden (403)
const forbiddenMovieMessage = 'Нет прав для удаления фильма';

// NotFound (404)
const notFoundUserMessage = 'Пользователь по указанному id не найден';
const notFoundMovieMessage = 'Фильм по указанному id не найден';
const notFoundPathMessage = 'Задан неправильный путь';

// Conflict (409)
const conflictErrorMessage = 'Такой пользователь уже существует';

// InternalServerError (500)
const serverErrorMessage = 'Ошибка на сервере';

module.exports = {
  validationErrorMessage,
  incorrectUserIdMessage,
  incorrectMovieIdMessage,
  unauthorizedErrorMessage,
  authRequiredMessage,
  forbiddenMovieMessage,
  notFoundUserMessage,
  notFoundMovieMessage,
  notFoundPathMessage,
  conflictErrorMessage,
  serverErrorMessage,
};
