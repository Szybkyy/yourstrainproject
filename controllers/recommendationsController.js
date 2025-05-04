const { where } = require("sequelize");
const db = require("../models");
const {Strain, sequelize, Sequelize, UserPreferences, User} = require("../models");
const jwt = require('jsonwebtoken');
const runRuleBased = require("../engine/ruleBasedRecommendations");

const getRecommendedStrains = async (req,res) => {
    try {
        const arr = await runRuleBased(req,res)
        const limit = req.query.limit
        if(limit){
            let topX = arr.slice(0,limit)
            return res.send(topX)
        }
        return res.send(arr[0])
    } catch (error) {
        return res.status(500).json({message:"Server error!"})
    }
}

module.exports = {getRecommendedStrains}