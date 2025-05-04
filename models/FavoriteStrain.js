const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")

module.exports = (sequelize,Sequelize) => {
    const FavoriteStrain = sequelize.define("FavoriteStrain", {}, {timestamps: false, tableName: "FavoriteStrains", indexes: [
        {unique : true, fields: ['user_id','strain_id']}
    ]})
    
    FavoriteStrain.associate = (models) => {
        FavoriteStrain.belongsTo(models.User ,{foreignKey: "user_id"})
        FavoriteStrain.belongsTo(models.Strain ,{foreignKey: "strain_id"})
    }

    return FavoriteStrain
}