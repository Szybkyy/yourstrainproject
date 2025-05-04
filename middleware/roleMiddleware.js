const jwt = require("jsonwebtoken");

const checkRole = (roles) => {
    return (req,res, next) => {
        const decodedCookie = jwt.verify(req.cookies.jwtid, process.env.JWT_SECRET)

        if(!decodedCookie)
            return res.status(401).json("Authorization denied!")
        if(!roles && decodedCookie)
            return next()
        if(roles.includes(decodedCookie.role))
            return next()
        else
            return res.status(401).json("Authorization denied!")
    }
}

module.exports = checkRole