const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")


module.exports = (sequelize,Sequelize) => {
    const UserLiked = sequelize.define("UserLiked", {}, {timestamps: false})
    
    UserLiked.associate = (models) => {
        UserLiked.belongsTo(models.User, {foreignKey: "user_id"})
        UserLiked.belongsTo(models.Strain, {foreignKey: "strain_id"})
    }

    return UserLiked
}