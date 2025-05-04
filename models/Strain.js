const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")

module.exports = (sequelize,Sequelize) => {
    const Strain = sequelize.define("Strain", {
        name : {type: DataTypes.STRING, allowNull: false, unique:true},
    }, {timestamps: false})
    
    Strain.associate = (models) => {
        Strain.belongsToMany(models.Effect,{through: models.StrainEffects, foreignKey: "strain_id"})
        Strain.hasMany(models.FavoriteStrain, { foreignKey: "strain_id" });
    }

    return Strain
}