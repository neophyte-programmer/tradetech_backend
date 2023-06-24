const express = require('express');
const { createBrand, updateBrand, getSingleBrand, getAllBrand, deleteBrand } = require('../controllers/brandController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/brand

// POST
router.post("/new", authMiddleware, isAdmin, createBrand)

// GET
router.get("/all", getAllBrand)
router.get("/:id", getSingleBrand)


// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteBrand)


// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateBrand)

module.exports = router;
