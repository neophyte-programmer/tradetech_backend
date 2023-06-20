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
router.delete("/drop/:id", deleteProduct)


// PUT
router.put("/edit/:id", updateProduct)

module.exports = router;
