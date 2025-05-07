const getIdFromJwt = require("../config/getIdFromJwt");
const { getAllEffectsNames } = require("../controllers/effectsController");
const buildUserProfile = require("../services/buildUserProfile");
const {trainOrGetNeuralNetwork} = require("../services/trainNeuralNetwork");
const { cosineSimilarity, toVector } = require("../utils/vectorMath");
const  {Strain, UserLiked, UserDisliked, User} = require("../models");
const db = require("../models");

const runHybrid = async (req,res) => {
    const userId = await getIdFromJwt(req,res,User)
    const effectNames = await getAllEffectsNames()
    const userProfile = await buildUserProfile(userId,effectNames)
    const allStrains = await Strain.findAll({include: db.sequelize.models.Effect})
    const allLiked = await UserLiked.findAll({where:{user_id:userId}, include:{model:db.sequelize.models.Strain, include: db.sequelize.models.Effect}})
    const likedIds = allLiked.map(liked => liked.strain_id)
    // if(allLiked.length<1)
    //     return res.send("Provide at least one liked and disliked strain to get recommendations!")
    const allDisliked = await UserDisliked.findAll({where:{user_id:userId}, include:{model:db.sequelize.models.Strain, include: db.sequelize.models.Effect}})
    const dislikedIds = allDisliked.map(disliked => disliked.strain_id)
    // if(allDisliked.length <1)
    //     return res.send("Provide at least one liked and disliked strain to get recommendations!")
    const net = await trainOrGetNeuralNetwork(userId,effectNames,allLiked,allDisliked)
    const userVector = toVector(userProfile,null,effectNames)
    const scored = []
    allStrains.forEach(strain => {
        const strainVectorNames = toVector(null,strain,effectNames) //CREATING A FAKE VECTOR STILL WITH EFFECT NAMES FOR TRANSFROMING IT INTO REAL VECTOR NEXT
        const strainVector = toVector(strainVectorNames,null,effectNames) //ACTUAL VECTOR FOR COMPARISION USING COSINE SIMILARITY
        const similarity = cosineSimilarity(userVector,strainVector)
        const nnResult = net.run(toVector(null,strain,effectNames))
        const nnScore = nnResult.like - nnResult.dislike
        let score = Math.round((0.5 * nnScore + 0.5 * similarity)*100)/100 //WAGES OF NEURAL NETWORK AND SIMILARITY CAN BE CHANGED
        if(!(dislikedIds.includes(strain.id)) && !(likedIds.includes(strain.id))) //NOT SHOWING LIKED AND DISLIKED STRAINS
            return scored.push({name:strain.name,score:score})
    })
    scored.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    return res.send(scored)
}

module.exports = runHybrid