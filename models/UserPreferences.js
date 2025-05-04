const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")

module.exports = (sequelize,Sequelize) => {
    const UserPreferences = sequelize.define("UserPreferences", {
        value:{type:DataTypes.ENUM("like","dislike"), defaultValue:"like"}
    },{timestamps: false})

    UserPreferences.associate = (models) => {
        UserPreferences.belongsTo(models.User,{
            foreignKey: 'user_id'
        })
        UserPreferences.belongsTo(models.Effect,{
            foreignKey: 'effect_id'
        })
    }

    return UserPreferences
}