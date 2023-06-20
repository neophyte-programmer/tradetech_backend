const express = require('express');
const { createProduct, updateProduct, deleteProduct, getSingleProduct, getAllProducts, addToWishlist, giveRating } = require('../controllers/productController');

const router = express.Router();

// /api/product

// POST
router.post('/create', createProduct)

// GET
router.get("/all", getAllProducts)
router.get("/:id", getSingleProduct)

// DELETE


// PUT

module.exports = router;
