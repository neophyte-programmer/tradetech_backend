const express = require('express');
const { createColor, updateColor, getSingleColor, getAllColor, deleteColor } = require('../controllers/colorController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/color

// POST
router.post("/new", authMiddleware, isAdmin, createColor)

// GET
router.get("/all", getAllColor)
router.get("/:id", getSingleColor)


// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteColor)


// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateColor)

module.exports = router;
