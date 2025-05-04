const {Effect, UserPreferences, User} = require("../models")
const jwt = require('jsonwebtoken')
const { where } = require("sequelize")
const getIdFromJwt = require("../config/getIdFromJwt")
const db = require("../models")

const setPreferences = async (req,res) => {
    try {
        var {likedEffects, dislikedEffects} = req.body
        const userId = await getIdFromJwt(req,res,User)
        const exists = await UserPreferences.count({where: {user_id : userId}})
    
        if(exists>0)
            return res.status(409).json("Preferences already exists, please delete them before entering new!")
    
        for(let i=0; i<likedEffects.length; i++){
            const effect = await Effect.findOne({where: {name:likedEffects[i]}})
            const effectId = effect.id
            var pref = await UserPreferences.create({
                user_id: userId,
                effect_id : effectId,
                value: "like"
            })
        }

        for(let i=0; i<dislikedEffects.length; i++){
            const effect = await Effect.findOne({where: {name:dislikedEffects[i]}})
            const effectId = effect.id
            var pref = await UserPreferences.create({
                user_id: userId,
                effect_id : effectId,
                value: "dislike"
            })
        }
        return res.status(200).json("Preferences saved!")
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
}

const deletePreferencesAll = async (req,res) => {
    try {
        const userId = await getIdFromJwt(req,res,User)
        await UserPreferences.destroy({where: {user_id:userId}})
        res.send("All preferences have been deleted!")
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
}

const deletePreferenceOne = async (req,res) => {
    try {
        const {effectName} = req.body

        if(!effectName)
            return res.status(400).json({error: "effectName undefined" ,message: "Please provide effectName field, with name of effect you want to delete!"})

        const userId = await getIdFromJwt(req,res,User)
        const userPrefs = await UserPreferences.findOne({where: {user_id:userId}, include:[{
            model: db.sequelize.models.Effect,
            attributes: ['id','name'],
            where:{name:effectName}
        }]})

        if(!userPrefs)
            return res.send("There is no effect with name: "+effectName+" in your preferences!")

        const chosenEffectId = userPrefs.Effect.id
        res.send("Effect with name: "+userPrefs.Effect.name+" has been deleted from your preferences!")
        await UserPreferences.destroy({where:{user_id:userId,effect_id:chosenEffectId}})
        return res.status(200)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
}

const getPreferencesLiked = async (req,res) => {
    const userId = await getIdFromJwt(req,res,User)
    const likedEffects = await UserPreferences.findAll({where: {user_id:userId, value:"like"}, attributes:['value'], include:[{
        model: db.sequelize.models.Effect,
        attributes: ['name']
    }]})

    let arrLiked = []
    for(let i=0; i<likedEffects.length; i++)
        arrLiked.push({name: likedEffects[i].Effect.name})
    
    return res.send(arrLiked)
}

const getPreferencesDisliked = async (req,res) => {
    const userId = await getIdFromJwt(req,res,User)
    const dislikedEffects = await UserPreferences.findAll({where: {user_id:userId, value:"dislike"}, attributes:['value'], include:[{
        model: db.sequelize.models.Effect,
        attributes: ['name']
    }]})
    
    let arrDisliked = []
    for(let i=0; i<dislikedEffects.length; i++)
        arrDisliked.push({name: dislikedEffects[i].Effect.name})

   return res.send(arrDisliked)
}

module.exports = {setPreferences, deletePreferencesAll, deletePreferenceOne,getPreferencesLiked, getPreferencesDisliked}