const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message })); // обработка ошибок
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(() => res
      .status(500)
      .send({ message: 'Произошла ошибка при создании карточки' })); // обработка ошибок
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res
      .status(500)
      .send({ message: 'Произошла ошибка при удалении карточки' })); // обработка ошибок
};

module.exports.putLike = async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (card) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((newCard) => res.send({ data: newCard }))
      .catch(() => res
        .status(500)
        .send({ message: 'Произошла ошибка при добавлении лайка' }));
  } else res.status(404).send({ message: 'Карточка не найдена' });
};

module.exports.deleteLike = async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (card) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((newCard) => res.send({ data: newCard }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка при удалении лайка' }));
  } else res.status(404).send({ message: 'Карточка не найдена' });
};
