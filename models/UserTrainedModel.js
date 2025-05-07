const { DataTypes } = require("sequelize")
const { sequelize, Sequelize } = require(".")


module.exports = (sequelize,Sequelize) => {
    const UserTrainedModel = sequelize.define("UserTrainedModel", {
        json:{type: DataTypes.JSON, uniqe:true,allowNull:false}
    }, {timestamps: true})
    
    UserTrainedModel.associate = (models) => {
        UserTrainedModel.belongsTo(models.User)
    }

    return UserTrainedModel
}