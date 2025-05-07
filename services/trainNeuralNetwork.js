const brain = require('brain.js')
const {toVector} = require('../utils/vectorMath')
const {UserTrainedModel} = require('../models')


async function trainOrGetNeuralNetwork(userId, effectNames, likedStrains, dislikedStrains){
    const net = new brain.NeuralNetwork();
    const dbModel = await UserTrainedModel.findOne({where: {userId:userId}})
    if(dbModel){
        const json = JSON.parse(dbModel.json)
        net.fromJSON(json)
        return net
    }

    const trainingDataVector = []
    dislikedStrains.forEach(({Strain})=>{
        const input = toVector(null,Strain,effectNames)
        trainingDataVector.push({input, output:{like:0,dislike:1}})
    })
    likedStrains.forEach(({Strain})=>{
            const input = toVector(null,Strain,effectNames)
            trainingDataVector.push({input,output:{like:1,dislike:0}})
    })    
    net.train(trainingDataVector)
    const json = net.toJSON()
    await UserTrainedModel.create({json:json,UserId:userId})
    return net
}

module.exports = {trainOrGetNeuralNetwork}