require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { MONGODB_URL } = require('./config');
const router = require('./routes');
const { NotFoundError } = require('./utils/errors/errors');
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');

const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

// запуск приложения и подключения
const { PORT = 3100 } = process.env;
const app = express();
app.use(cors());
mongoose.connect(MONGODB_URL);
app.use(express.json());

// безопасность приложения
const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);
app.use(helmet());

// подключение логгера запросов
app.use(requestLogger);

// подключение роутов
app.use(router);

// подключение логгера ошибок и обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use('*', (req, res, next) => next(new NotFoundError('Задан неправильный путь')));
app.use(internalServerErrorHandler);

// запуск приложения на порту
app.listen(PORT);
