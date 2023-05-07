/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');

const errors = require('../errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        return next(res.status(errors.NOT_FOUND).send(errors.errMsgNotFound));
      }
      return card.remove().then(() => res.send({ message: 'карточка удалена' }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(res.status(errors.NOT_FOUND).send(errors.errMsgNotFound));
      }
      return res.send(card);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(res.status(errors.NOT_FOUND).send(errors.errMsgNotFound));
      }
      return res.send(card);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
