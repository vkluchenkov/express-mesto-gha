const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/', auth, getCards);
router.post(
  '/',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
      ),
    }),
  }),
  createCard
);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, putLike);
router.delete('/:cardId/likes', auth, deleteLike);

module.exports = router;
