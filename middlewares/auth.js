const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new ForbiddenError('Необходима авторизация');

    const payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    if (!payload) throw new UnauthorizedError('Необходима авторизация');

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};