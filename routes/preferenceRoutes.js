const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const {setPreferences, deletePreferenceOne, deletePreferencesAll, getPreferencesLiked, getPreferencesDisliked} = require('../controllers/preferencesController');


const preferenceRouter = express.Router()

preferenceRouter.post('/set', checkRole(['user','admin','mod']), setPreferences)
preferenceRouter.delete('/delete/one', checkRole(['user','admin','mod']), deletePreferenceOne)
preferenceRouter.delete('/delete/all', checkRole(['user','admin','mod']), deletePreferencesAll)
preferenceRouter.get('/get/liked',checkRole(['user','admin','mod']), getPreferencesLiked)
preferenceRouter.get('/get/disliked', checkRole(['user','admin','mod']), getPreferencesDisliked)

module.exports = preferenceRouter