const { getAllEffectsNames } = require('../controllers/effectsController')
const db = require('../models')
const {UserLiked} = require('../models')


const buildUserProfile = async (userId, effectNames) => {
    const allLiked = await UserLiked.findAll({where: {user_id:userId}, include: [{
        model: db.sequelize.models.Strain,
        include: [{model: db.sequelize.models.Effect}]
    }]})

    //HELPER OBJECTS FOR CALCULATING USER PREFERENCED SCORE ON EACH EFFECT (AVERAGE)
    const sums = {}
    const counts = {}

    allLiked.forEach(strain => {
        strain.Strain.Effects.forEach(effect => {
            var name = effect.name
            var score = effect.StrainEffects.score
            //CALCULATING AVERAGE
            sums[name] = (sums[name] || 0) + score
            counts[name] = (counts[name] || 0) + 1
        })
    });
    
    //SAVING TO PROFILE
    const profile = {}
    effectNames.forEach(name => {
        profile[name] = Math.round(((sums[name]||0)/(counts[name]||1)*1000))/1000
    })
    return profile
}

module.exports = buildUserProfile