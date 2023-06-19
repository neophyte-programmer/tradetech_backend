const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// /api/user

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get("/:id", authMiddleware, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

module.exports = router;