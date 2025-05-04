const jwt = require('jsonwebtoken')
const {User, Strain, FavoriteStrain} = require('../models')
const { where } = require('sequelize')
const getIdFromJwt = require('../config/getIdFromJwt')
const db = require('../models')


const addToFavorite = async (req,res) => {
   try {
        const userId = await getIdFromJwt(req,res,User)
        const {name} = req.body
    
        const dbChosenStrain = await Strain.findOne({where: {name: name}})
        const [newFavorite, created] = await FavoriteStrain.findOrCreate({where: {strain_id: dbChosenStrain.id, user_id: parseInt(userId)}})
    
        if(!created)
           return res.send("This Strain is already in your favorites list!")
    
    return res.send(newFavorite)
   } catch (error) {
       console.error(error);
       return res.status(500).json({message:"Server error"})
   }
}

const getAllUserFavorites = async (req,res) => {
    try {
        const userId = await getIdFromJwt(req,res,User)
        const allFav = await FavoriteStrain.findAll({attributes: [],include: [{
            model: db.sequelize.models.Strain,
            attributes: ['name']
        },{
            model: db.sequelize.models.User,
            attributes: []
        }], where: {user_id:userId}})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
}

const deleteFavorite = async (req,res) => {
    try {
        const strainId = req.params.id
        const userId = await getIdFromJwt(req,res,User)
        const strain = await FavoriteStrain.findOne({where:{strain_id:strainId}, include: [{
            model: db.sequelize.models.Strain,
        }]})
        const strainName = strain.Strain.name
        await FavoriteStrain.destroy({where: {user_id:userId,strain_id:strainId}})
        res.status(200).json("Deleted strain with name: "+strainName+" from your favorite list!")
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
}

module.exports = {addToFavorite, getAllUserFavorites, deleteFavorite}