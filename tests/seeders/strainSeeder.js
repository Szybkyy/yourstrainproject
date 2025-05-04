const { where } = require("sequelize");
const {StrainEffects, Effect, Strain} = require("../../models");
const effectInstances = require("./effectSeeder");

const strainsData = [
    {
      name: 'Amnesia Haze',
      effects: {
        energetic: 0.9,
        euphoric: 0.8,
        happy: 0.8,
        relaxed: 0.7,
      },
    },
    {
      name: 'Blue Dream',
      effects: {
        relaxed: 0.9,
        happy: 0.8,
        euphoric: 0.8,
        creative: 0.7,
      },
    },
    {
      name: 'Northern Lights',
      effects: {
        relaxed: 0.9,
        sleepy: 0.8,
        happy: 0.7,
        euphoric: 0.7,
      },
    },
    {
      name: 'Sour Diesel',
      effects: {
        energetic: 0.9,
        uplifted: 0.8,
        happy: 0.8,
        creative: 0.7,
      },
    },
    {
      name: 'Pineapple Express',
      effects: {
        energetic: 0.8,
        happy: 0.8,
        uplifted: 0.7,
        creative: 0.7,
      },
    },
    {
      name: 'OG Kush',
      effects: {
        relaxed: 0.9,
        happy: 0.8,
        euphoric: 0.8,
        sleepy: 0.7,
      },
    },
    {
      name: 'Girl Scout Cookies',
      effects: {
        happy: 0.9,
        euphoric: 0.8,
        relaxed: 0.8,
        creative: 0.7,
      },
    },
    {
      name: 'Green Crack',
      effects: {
        energetic: 0.9,
        focused: 0.8,
        happy: 0.8,
        uplifted: 0.7,
      },
    },
    {
      name: 'AK-47',
      effects: {
        relaxed: 0.8,
        happy: 0.8,
        euphoric: 0.7,
        uplifted: 0.7,
      },
    },
    {
      name: 'Jack Herer',
      effects: {
        happy: 0.9,
        energetic: 0.8,
        euphoric: 0.8,
        creative: 0.7,
      },
    },
  ];

  const seedStrains = async () => {
    for(var strainData of strainsData){
        const strain = await Strain.create({name: strainData.name})
        
        // for(var [effectName,score] of Object.entries(strainData.effects)){
        //     var effect = effectInstances[effectName]
        // if(effect){
        //     await StrainEffects.create({
        //         strain_id : strain.id,
        //         effect_id : effect.id,
        //         score
        //     })
        // }}
        
        var strainEffectCount = 0;
        for(var [effectName,score] of Object.entries(strainData.effects)){
            var effect = await Effect.findOne({where:{name:effectName}})
            if(effect){
                    await StrainEffects.create({
                        strain_id : strain.id,
                        effect_id : effect.id,
                        score
                    })
                    strainEffectCount++
                }}
        }
        console.log(strainEffectCount);
        console.log("Strains has been seeded to database!");
    }

  

  seedStrains()