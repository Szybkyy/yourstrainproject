const db = require('../models');

const connectDb = async (sequelize,Sequelize) => {
    try {
        await db.sequelize.sync({force:false})
        console.log("Database connected and synced successfully!");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDb