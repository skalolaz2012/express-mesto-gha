const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards')

const cardsRouter = require('express').Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;