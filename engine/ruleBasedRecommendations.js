const { where } = require("sequelize");
const db = require("../models");
const {Strain, sequelize, Sequelize, UserPreferences, User} = require("../models");
const getIdFromJwt = require("../config/getIdFromJwt");

const runRuleBased = async (req,res) => {
    const userId = await getIdFromJwt(req,res,User)
    const prefs = await UserPreferences.findAll({where: {user_id:userId}, include: [{model: db.sequelize.models.Effect}]})
    const allStrains = await Strain.findAll({include: [{
        model: db.sequelize.models.Effect,
        through: {
            attributes: ['score']
        }
    }]
    })

    if(!prefs)
        return res.status(400).json({error:"preferences undefined", message:"User preferences not defined please define one using api/preferences/set!"})

    const likedEffects = prefs.filter(p => p.value === "like").map(p => p.Effect.name)
    const dislikedEffects = prefs.filter(p => p.value === "dislike").map(p => p.Effect.name)

    var helper = []
    for(var strainData of allStrains){
            var score = 0;
            for(let i=0; i<strainData.Effects.length; i++){
                //console.log(likedEffects.includes(strainData.Effects[i].name));
                if(likedEffects.includes(strainData.Effects[i].name))
                    score += parseFloat(strainData.Effects[i].StrainEffects.score)
                
                if(dislikedEffects.includes(strainData.Effects[i].name))
                    score -= parseFloat(strainData.Effects[i].StrainEffects.score)
            }
            helper.push({ name:strainData.name,score:score})
    }
    helper.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    return helper
}

module.exports = runRuleBased