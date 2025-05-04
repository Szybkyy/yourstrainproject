const express = require('express');
const userRouter = require('./userRoutes');
const checkRole = require('../middleware/roleMiddleware');
const {getRecommendedStrains} = require('../controllers/recommendationsController');

const recommendationsRouter = express.Router()

recommendationsRouter.get('/get', checkRole(['user','admin','mod']), getRecommendedStrains)



module.exports = recommendationsRouter