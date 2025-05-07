const dotenv = require('dotenv');
const express = require('express');
const connectDb = require('../config/connectDb');
const createTestUsers = require('../tests/createTestUsers');
const userRouter = require('../routes/userRoutes');
const cookieParser = require('cookie-parser');
const { sequelize, Sequelize } = require('../models');
const recommendationsRouter = require('../routes/recommendationsRoutes');
const preferenceRouter = require('../routes/preferenceRoutes');
const favoriteRouter = require('../routes/favoriteRoutes');
const likedRouter = require('../routes/userLikedRoutes');
const dislikedRouter = require('../routes/userDislikedRoutes');



dotenv.config()

const app = express()

//JSON
app.use(express.json())
app.use(cookieParser())

//ROUTING MIDDLEWARES
app.use("/disliked", dislikedRouter)
app.use("/liked", likedRouter)
app.use("/favorite", favoriteRouter)
app.use("/recommendations", recommendationsRouter)
app.use("/preferences", preferenceRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT, () => {
    connectDb(sequelize,Sequelize)
    //createTestUsers() //-> creating Test users records
    console.log("Server running on port: "+process.env.PORT);
})