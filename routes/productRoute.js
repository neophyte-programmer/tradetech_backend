const express = require('express');
const { createProduct, updateProduct, deleteProduct, getSingleProduct, getAllProducts, addToWishlist, giveRating } = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/product

// POST
router.post('/new', authMiddleware, isAdmin, createProduct)

// GET
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)

// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteProduct)


// PUT
router.put("/wishlist", authMiddleware, addToWishlist)
router.put("/rating", authMiddleware, giveRating)
router.put("/edit/:id", authMiddleware, isAdmin, updateProduct)

module.exports = router;
