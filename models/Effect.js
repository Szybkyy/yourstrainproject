const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")



module.exports = (sequelize,Sequelize) => {
    const Effect = sequelize.define("Effect", {
        name : {type: DataTypes.STRING, allowNull: false, unique:true},
    }, {timestamps: false})
    
    Effect.associate = (models) => {
        Effect.belongsToMany(models.Strain,{through: models.StrainEffects, foreignKey: "effect_id"})
        Effect.hasMany(models.UserPreferences, {foreignKey: "effect_id"})
    }

    return Effect
}