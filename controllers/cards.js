/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');
const myError = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id, // используем req.user
  })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new myError.BadRequestError(myError.BadRequestMsg));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return next(new myError.NotFoundError(myError.NotFoundMsg));
      } if (!card.owner.equals(req.user._id)) {
        return next(new myError.ForbiddenError(myError.ForbiddenMsg));
      }
      return res.send({ message: 'Удалено успешно' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      res.send({ card, message: 'Лайк!' });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
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
