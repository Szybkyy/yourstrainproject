const { where } = require("sequelize");
const {StrainEffects, Effect, Strain} = require("../../models");
const effectInstances = require("./effectSeeder");

const strainsData = [
  {
    name: "Blue Dream",
    effects: {
      happy: 0.9,
      relaxed: 0.85,
      euphoric: 0.8,
      creative: 0.75
    }
  },
  {
    name: "OG Kush",
    effects: {
      relaxed: 0.95,
      euphoric: 0.85,
      sleepy: 0.7,
      hungry: 0.65
    }
  },
  {
    name: "Sour Diesel",
    effects: {
      energetic: 0.9,
      uplifted: 0.85,
      talkative: 0.8,
      focused: 0.75
    }
  },
  {
    name: "Girl Scout Cookies",
    effects: {
      happy: 0.88,
      relaxed: 0.9,
      euphoric: 0.86,
      sleepy: 0.6
    }
  },
  {
    name: "Green Crack",
    effects: {
      energetic: 0.95,
      focused: 0.9,
      creative: 0.8,
      uplifted: 0.85
    }
  },
  {
    name: "Northern Lights",
    effects: {
      sleepy: 0.95,
      relaxed: 0.9,
      happy: 0.7,
      euphoric: 0.75
    }
  },
  {
    name: "Pineapple Express",
    effects: {
      happy: 0.9,
      energetic: 0.85,
      uplifted: 0.8,
      talkative: 0.75
    }
  },
  {
    name: "Granddaddy Purple",
    effects: {
      relaxed: 0.95,
      sleepy: 0.9,
      happy: 0.85,
      hungry: 0.8
    }
  },
  {
    name: "Jack Herer",
    effects: {
      energetic: 0.9,
      creative: 0.88,
      uplifted: 0.85,
      focused: 0.82
    }
  },
  {
    name: "Wedding Cake",
    effects: {
      relaxed: 0.9,
      euphoric: 0.88,
      happy: 0.85,
      sleepy: 0.7
    }
  },
  {
    name: "AK-47",
    effects: {
      happy: 0.9,
      relaxed: 0.85,
      euphoric: 0.82,
      uplifted: 0.8
    }
  },
  {
    name: "Durban Poison",
    effects: {
      energetic: 0.95,
      uplifted: 0.9,
      creative: 0.88,
      focused: 0.86
    }
  },
  {
    name: "Bubba Kush",
    effects: {
      sleepy: 0.95,
      relaxed: 0.9,
      happy: 0.8,
      hungry: 0.75
    }
  },
  {
    name: "Lemon Haze",
    effects: {
      energetic: 0.9,
      happy: 0.88,
      uplifted: 0.86,
      talkative: 0.82
    }
  },
  {
    name: "Critical Mass",
    effects: {
      relaxed: 0.92,
      sleepy: 0.89,
      euphoric: 0.78,
      happy: 0.8
    }
  },
  {
    name: "Amnesia Haze",
    effects: {
      uplifted: 0.9,
      happy: 0.88,
      energetic: 0.87,
      focused: 0.83
    }
  }
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