const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const { handleError } = require('../errors/handleError');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    if (cards.length) {
      res.send(cards);
    } else throw new NotFoundError('Карточки отсутствуют');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    await card.populate(['owner', 'likes']);
    res.send(card);
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (card) res.send({ message: 'Карточка удалена' });
    else throw new NotFoundError('Карточка не найдена');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.putLike = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true, runValidators: true },
      );
      await updatedCard.populate(['owner', 'likes']);
      res.send(updatedCard);
    } else throw new NotFoundError('Карточка не найдена');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.deleteLike = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true, runValidators: true },
      );
      await updatedCard.populate(['owner', 'likes']);
      res.send(updatedCard);
    } else throw new NotFoundError('Карточка не найдена');
  } catch (err) {
    handleError({ err, res });
  }
};
