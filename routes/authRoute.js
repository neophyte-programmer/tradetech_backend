const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// /api/user

// POST
router.post('/register', createUser)
router.post('/login', loginUser)

// GET
router.get('/all', getAllUsers)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get("/:id", authMiddleware, isAdmin, getSingleUser)

// DELETE
router.delete("/:id", deleteUser)


// PUT
router.put("/edit", authMiddleware, updateUser)
router.put("/block/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser)

module.exports = router;