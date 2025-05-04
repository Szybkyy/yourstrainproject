const jwt = require("jsonwebtoken");
const {User} = require("../models")

const getAllUsers = async (req,res) => {
    try {
        const allUsers = await User.findAll()
        return res.status(200).json(allUsers)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Something went wrong!')
    }
}

const getUserById = async (req,res) => {
    let id = req.params.id
    try {
        const user = await User.findByPk(id)
        if(user)
            return res.status(200).json(user)
        else
            return res.status(404).json("Cant find user with id: "+id)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Something went wrong!')
    }
}

const registerNewUser = async (req,res) => {
   var {username,email,password,role} = req.body
    try {
        if(!role)
            var newUser = await User.create({username: username, email:email, password:password})
        else
            var newUser = await User.create({username: username, email:email, password:password, role:role})

        return res.status(202).json(newUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Something went wrong!')
    }
}

const loginUser = async (req,res) => {
    var {username,email,password} = req.body
    if(username)
        var selector = { where: {username:username}}
    else
        selector = {where: {email:email}}
    const foundUser = await User.findOne(selector)
    if(!foundUser)
        return res.status(401).json("Wrong credentials!")
    var isMatch = foundUser.authenticate(password)
    if(isMatch){
        const token = jwt.sign({username: foundUser.username, email: foundUser.email, role: foundUser.role}, process.env.JWT_SECRET)
        res.cookie("jwtid",token)
        return res.status(200).json("Logged in!")
    } else
        return res.status(401).json("Wrong credentials!")
}

module.exports = {getAllUsers,getUserById,registerNewUser, loginUser}