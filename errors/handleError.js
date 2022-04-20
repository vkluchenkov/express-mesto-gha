module.exports.handleError = ({ err, res }) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Что-то пошло не так...';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Переданы некорректные данные';
  }

  res
    .status(statusCode)
    .send({ message });
};
