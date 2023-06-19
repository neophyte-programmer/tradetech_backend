const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Register user
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

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // find the user with the email
    const findUser = await User.findOne({ email: email })

    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id)
        })
    } else {
        throw new Error('Invalid email or password')
    }
})

// Fetch all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Fetch a single user
const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id)
        res.json(singleUser)
    } catch (error) {
        throw new Error(error)
    }
})

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id)
        res.json("User deleted successfully")
    } catch (error) {
        throw new Error(error)
    }
})

// Update a user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, { new: true })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = {
    createUser, loginUser, getAllUsers, getSingleUser, updateUser, deleteUser
}