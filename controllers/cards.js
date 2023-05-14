/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');
const myError = require('../errors/errors');
const { CREATED } = require('../utils/constants');

const checkCard = (card, res) => {
  if (!card) {
    throw new myError.NotFoundError(myError.NotFoundMsg);
  } return res.send(card);
}

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(CREATED).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new myError.BadRequestError(myError.BadRequestMsg));
      } next (err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      res.send({ message: 'Удалено успешно' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .orFail(new myError.NotFoundError(myError.NotFoundMsg))
  .then((card) => {
    res.send(card);
  })
  .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
