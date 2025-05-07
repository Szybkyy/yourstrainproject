const express = require('express');
const userRouter = require('./userRoutes');
const checkRole = require('../middleware/roleMiddleware');
const runHybrid = require('../engine/runHybridRecommendations');

const recommendationsRouter = express.Router()

recommendationsRouter.get('/get', checkRole(['user','admin','mod']), runHybrid)



module.exports = recommendationsRouter