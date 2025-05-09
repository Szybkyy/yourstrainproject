const { where } = require("sequelize");
const {Effect} = require("../../models");



const effectsData = [
  'happy',
  'relaxed',
  'euphoric',
  'creative',
  'sleepy',
  'hungry',
  'energetic',
  'uplifted',
  'talkative',
  'focused'
]
  
  const effectInstances = []
  const seedEffects = async () => {  
      for(var effectName of effectsData){
      const [effect] = await Effect.findOrCreate({where: {name:effectName}})
      effectInstances[effectName] = effect;
    }
  console.log("Effects has been seeded to database!")
  }
  
  seedEffects()

  module.exports = effectInstances

