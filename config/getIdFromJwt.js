const jwt = require('jsonwebtoken')

async function getIdFromJwt(req,res,User){
        const token = req.cookies.jwtid
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({where: {username:userDecoded.username}})
        const id = parseInt(user.id)

        return id
}

module.exports = getIdFromJwt