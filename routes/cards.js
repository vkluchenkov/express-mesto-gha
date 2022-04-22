const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
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
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
