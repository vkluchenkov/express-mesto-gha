const { isCelebrateError } = require('celebrate');

module.exports.handleError = ({ err, res }) => {
  const celebrateErr = isCelebrateError(err);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Что-то пошло не так...';

  // Mongo validation errors
  if (err.name === 'ValidationError' || err.name === 'CastError' || celebrateErr) {
    statusCode = 400;
    message = err.message || 'Переданы некорректные данные';
  }

  // Mongo unique key error
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже существует';
  }

  res.status(statusCode).send({ message });
};
