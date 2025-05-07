const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const { addToDisliked } = require('../controllers/userDislikedController');



const dislikedRouter = express.Router()

dislikedRouter.post('/add/:id', checkRole(['user','admin','mod']), addToDisliked)
//dislikedRouter.delete('/delete/:id', checkRole(['user','admin','mod']), deleteFromLiked)


module.exports = dislikedRouter