const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")

module.exports = (sequelize,Sequelize) => {
    const StrainEffects = sequelize.define("StrainEffects", {
        score : {type: DataTypes.FLOAT, allowNull: false},
    }, {timestamps: false})
    
    StrainEffects.associate = (models) => {
        StrainEffects.belongsTo(models.Strain,{
            foreignKey: 'strain_id'
        })
        StrainEffects.belongsTo(models.Effect,{
            foreignKey: 'effect_id'
        })
    }

    return StrainEffects
}