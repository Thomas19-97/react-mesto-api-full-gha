const Cards = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Cards.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};
const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Cards.create({ name, link, owner })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Cards.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        throw new ForbiddenError('Невозможно удалить чужую карточку');
      }
      Cards.deleteOne(card)
        .then(() => {
          res.status(200).send(card);
        })
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      } else {
        next(error);
      }
    });
};

const updateCardLike = (req, res, next, newData) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    newData,
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      } else {
        next(error);
      }
    });
};

const likeCard = (req, res, next) => {
  const newLike = { $addToSet: { likes: req.user._id } };
  return updateCardLike(req, res, next, newLike);
};

const dislikeCard = (req, res, next) => {
  const likeToRemove = { $pull: { likes: req.user._id } };
  return updateCardLike(req, res, next, likeToRemove);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
