const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
        try {
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
                // find user with id from decoded token
                const user = await User.findById(decodedToken?.id)
                req.user = user
                next()

            }
        } catch (error) {
            throw new Error("Expired token! Please login again")
        }
    } else {
        throw new Error("There is no token attached to header")
    }
})

module.exports = { authMiddleware };