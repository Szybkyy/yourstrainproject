const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")


module.exports = (sequelize,Sequelize) => {
    const UserDisliked = sequelize.define("UserDisliked", {}, {timestamps: false})
    
    UserDisliked.associate = (models) => {
        UserDisliked.belongsTo(models.User, {foreignKey: "user_id"})
        UserDisliked.belongsTo(models.Strain, {foreignKey: "strain_id"})
    }

    return UserDisliked
}