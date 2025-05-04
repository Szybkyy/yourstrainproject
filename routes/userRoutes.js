const express = require('express');
const { registerNewUser, loginUser, getAllUsers } = require('../controllers/userController');
const checkRole = require('../middleware/roleMiddleware');


const userRouter = express.Router();

userRouter.get("/all",checkRole('user'),getAllUsers)
userRouter.post("/register", registerNewUser)
userRouter.post("/login", loginUser)

module.exports = userRouter