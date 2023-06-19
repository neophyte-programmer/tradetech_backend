const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// /api/user

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get("/:id", authMiddleware, isAdmin, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/edit", authMiddleware, updateUser)
router.put("/block/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser)

module.exports = router;