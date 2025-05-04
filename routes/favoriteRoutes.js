const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const { addToFavorite, getAllUserFavorites, deleteFavorite } = require('../controllers/favoriteStrainsController');

const favoriteRouter = express.Router()

favoriteRouter.post('/add', checkRole(['user','admin','mod']), addToFavorite)
favoriteRouter.delete('/delete/:id', deleteFavorite)
favoriteRouter.get('/all', getAllUserFavorites)

module.exports = favoriteRouter