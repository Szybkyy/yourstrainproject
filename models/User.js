const { DataTypes } = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");
const { sequelize, Sequelize } = require(".");
const db = require(".");

module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("User", {
        username : {type: DataTypes.STRING, allowNull: false, unique:true},
        email: {type: DataTypes.STRING, allowNull: false, unique:true},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.ENUM("admin","mod","user"), allowNull:false, defaultValue:"user"}
    }, {timestamps: true})

    useBcrypt(User)
    
    User.associate = (models) => {
        User.hasMany(models.UserPreferences, {foreignKey: "user_id"})
        User.hasMany(models.FavoriteStrain, { foreignKey: "user_id" });
        User.belongsToMany(models.Strain, {through: models.UserLiked, foreignKey: "user_id", otherKey: "strain_id"})
        User.belongsToMany(models.Strain, {through: models.UserDisliked, foreignKey: "user_id", otherKey: "strain_id"})
        User.hasOne(models.UserTrainedModel)
    }
    return User
}