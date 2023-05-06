/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');

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

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      res.send(card);
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
