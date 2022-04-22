const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, updateMe, updateMeAvatar, getMe } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.get('/me', auth, getMe);

router.patch(
  '/me',
  auth,
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
  auth,
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
