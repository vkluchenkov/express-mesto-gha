const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, updateMe, updateMeAvatar, getMe } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me', getMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateMe
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
      ),
    }),
  }),
  updateMeAvatar
);

module.exports = router;
