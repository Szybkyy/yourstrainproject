const getIdFromJwt = require("../config/getIdFromJwt")
const {UserDisliked, User} = require("../models")
const db = require("../models")


const addToDisliked = async (req,res) => {
    try {
        const userId = await getIdFromJwt(req,res,User)
        const strainId = parseInt(req.params.id)
        const [newDisliked,created] = await UserDisliked.findOrCreate({where: {user_id:userId, strain_id:strainId}, include: [{model: db.sequelize.models.Strain}]})
    
        if(!created)
            return res.send("This Strain is already in your disliked list!")
    
        return res.send(newDisliked)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {addToDisliked}