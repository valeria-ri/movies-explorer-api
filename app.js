require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');
const { PORT, MONGODB_URL, MONGODB_URL_DEV } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');

const { NODE_ENV } = process.env;

// запуск приложения и подключения
const app = express();
app.use(cors());
mongoose.connect(NODE_ENV === 'production' ? MONGODB_URL : MONGODB_URL_DEV);
app.use(express.json());

// безопасность приложения
app.use(limiter);
app.use(helmet());

// подключение логгера запросов
app.use(requestLogger);

// подключение роутов
app.use(router);

// подключение логгера ошибок и обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(internalServerErrorHandler);

// запуск приложения на порту
app.listen(PORT);
