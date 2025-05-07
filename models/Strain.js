const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")

module.exports = (sequelize,Sequelize) => {
    const Strain = sequelize.define("Strain", {
        name : {type: DataTypes.STRING, allowNull: false, unique:true},
    }, {timestamps: false})
    
    Strain.associate = (models) => {
        Strain.belongsToMany(models.Effect,{through: models.StrainEffects, foreignKey: "strain_id"})
        Strain.hasMany(models.FavoriteStrain, { foreignKey: "strain_id" });
        Strain.belongsToMany(models.User, {through: models.UserLiked, foreignKey: "strain_id", otherKey: "user_id"})
        Strain.belongsToMany(models.User, {through: models.UserDisliked, foreignKey: "strain_id", otherKey: "user_id"})
    }

    return Strain
}