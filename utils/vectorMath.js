const { where } = require("sequelize")
const { getAllEffectsNames } = require("../controllers/effectsController")
const {UserLiked} = require("../models")
const getIdFromJwt = require("../config/getIdFromJwt")
const db = require("../models")

//OBJECT ARGUMENT IS USED FOR ACTUAL VECTOR MAKING, STRAIN IS USED FOR MAKING TRAINING MODEL AND FAKE VECTORS (STILL WITH EFFECT NAMES)
const toVector = (object, strain, effectNames) => {
    if(object){
        const vector = []
        effectNames.forEach(name => {
            vector.push(object[name])
        })
        return vector
    }
    if(strain){
            const input = {}
            effectNames.forEach(name => {
                var effect = strain.Effects.find(e => e.name === name)
                input[name] = effect ? effect.StrainEffects.score : 0
            })
            return input
    }

    if(likedStrains && object)
        return 0;
}

//COSINE SIMILARITY HELPER FUNCTIONS (DOT AND MAGNITUDE CALCULATION
const dot = (a,b) => {return a.reduce((sum,val,i) => sum+val*b[i],0)}
const magnitude = (vector) => {return Math.hypot(...vector)}

//ACTUAL COSINE SIMILARITY CALCULATIONS
const cosineSimilarity = (a,b) => {
    const magA = magnitude(a)
    const magB = magnitude(b)
    if(magA === 0 || magB === 0) return 0;
    return dot(a,b) / (magA * magB) 
}

module.exports = {toVector,cosineSimilarity}