const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 200,
});

module.exports = limiter;
