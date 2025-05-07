const {Effect} = require('../models')

//HELPER FUNCTION
const getAllEffectsNames = async () => {
    const result = []
    const allEffectNames = await Effect.findAll({attributes: ['name']})
    allEffectNames.forEach(element => {
        result.push(element.name)
    });
    return result
}

module.exports = {getAllEffectsNames}