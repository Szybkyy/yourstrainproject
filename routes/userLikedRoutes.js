const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const {addToLiked, deleteFromLiked} = require('../controllers/userLikedController');


const likedRouter = express.Router()

likedRouter.post('/add/:id', checkRole(['user','admin','mod']), addToLiked)
likedRouter.delete('/delete/:id', checkRole(['user','admin','mod']), deleteFromLiked)


module.exports = likedRouter