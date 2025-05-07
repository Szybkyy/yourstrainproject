const { where } = require("sequelize")
const getIdFromJwt = require("../config/getIdFromJwt")
const {User, UserLiked} = require("../models")
const db = require("../models")


const addToLiked = async (req,res) => {
    try {
        const userId = await getIdFromJwt(req,res,User)
        const strainId = parseInt(req.params.id)
        const [newLiked,created] = await UserLiked.findOrCreate({where: {user_id:userId, strain_id:strainId}, include: [{model: db.sequelize.models.Strain}]})
    
        if(!created)
            return res.send("This Strain is already in your liked list!")
    
        return res.send(newLiked)
    } catch (error) {
        console.error(error)
    }
}

const deleteFromLiked = async (req,res) => {
    const userId = await getIdFromJwt(req,res,User)
    const strainId = parseInt(req.params.id)
    const strain = await UserLiked.findOne({where: {user_id:userId, strain_id:strainId}, include:db.sequelize.models.Strain})
    const strainName = strain.Strain.name
    res.send("Deleted strain with name: "+strainName+" from your liked list!")
    await UserLiked.destroy({where:{user_id:userId, strain_id:strainId}})
}

module.exports = {addToLiked, deleteFromLiked}