/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');

const conditions = require('../utils/conditions');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(conditions.CREATED).send(newCard);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      conditions.checkData(card, res);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('DocumentNotFoundError'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      conditions.checkData(card, res);
    })
    .catch((err) => {
      conditions.sortErrors(err, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
