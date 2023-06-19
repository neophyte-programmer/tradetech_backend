const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser } = require('../controllers/userController');
const router = express.Router();



router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get("/:id", getSingleUser)
router.delete("/:id", deleteUser)

module.exports = router;