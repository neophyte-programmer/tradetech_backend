const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
    // get the email from the request body
    const email = req.body.email;
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        // user already exists
        throw new Error('User already exists')
    }
})

// Login Controller
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // find the user with the email
    const findUser = await User.findOne({ email: email })
    
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json(findUser)
    } else {
        throw new Error('Invalid email or password')
    }
})

module.exports = {
    createUser, loginUser
}