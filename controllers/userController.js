const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const { generateToken } = require('../config/jwtToken');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const sendEmail = require('./emailController');

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
        const refreshToken = await generateRefreshToken(findUser?.id)
        const updateUser = await User.findByIdAndUpdate(findUser?.id, {
            refreshToken: refreshToken
        }, {
            new: true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
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

// Handle the refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" Refresh token not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
})

// Handle logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // forbidden
    }
    // console.log(cookie);
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.json({
        message: "Logged out successfully",
    })
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
    validateMongodbId(id)

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
    validateMongodbId(id)

    try {
        const singleUser = await User.findByIdAndDelete(id)
        res.json({
            message: "User deleted successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

// Update a user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongodbId(id)
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

// Block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    try {
        const blockedUser = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            new: true
        })
        res.json({
            message: "User blocked successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})


// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    try {
        const unblockedUser = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            new: true
        })
        res.json({
            message: "User unblocked successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

// Update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const password = req.body.password;
    validateMongodbId(_id)

    const user = await User.findById(_id);

    if (password) {
        user.password = password;
        const updatedPassword = await user.save()

        res.json({
            message: "Password updated successfully",
        })
    } else {
        res.json({
            message: "Password could not be updated",
        })
    }
})

const generateForgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) throw new Error("User not found");
    try {
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `
            Hey there! You requested to change your password for TradeTech. If you didnt request for this email, kindly ignore. Otherwise, follow this link to reset your password for TradeTech. This link is valid for 10 minutes from now.
            <a href="http://localhost:5000/api/user/reset-password/${token}"> Click here </a>
        `
        const data = {
            to: email,
            text: "Hey TradeTech User",
            subject: "TradeTech Forgot Password Link",
            html: resetURL,
        }
        sendEmail(data)
        res.json({
            message: "Your request was successful",
            token: token
        })
    } catch (error) {
        throw new Error(error)
    }
})


// Reset your password
const resetPassword = asyncHandler(async (req, res) => { 
    const { password } = req.body
    const { token } = req.params

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    // find user using the token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now()}
    })

    if (!user) throw new Error("Your token has expired. Please try again")
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    res.json({
        message: "Your password has been reset successfully"
    })
})



module.exports = {
    createUser, loginUser, getAllUsers, getSingleUser, updateUser, deleteUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, generateForgotPasswordToken, resetPassword
}