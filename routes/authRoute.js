const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// /api/user

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get("/:id", authMiddleware, isAdmin, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/edit", authMiddleware, updateUser)

module.exports = router;