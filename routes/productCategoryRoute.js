const express = require('express');
const { createCategory, updateCategory, getSingleCategory, getAllCategory, deleteCategory } = require('../controllers/productCategoryController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/productCategory

// POST
router.post("/new", authMiddleware, isAdmin, createCategory)

// GET
router.get("/all", getAllCategory)
router.get("/:id", getSingleCategory)


// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteCategory)


// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateCategory)

module.exports = router;
