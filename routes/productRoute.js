const express = require('express');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    addToWishlist,
    giveRating,
    uploadImages,
    deleteImages
} = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, resizeProductImg } = require('../middlewares/uploadImages');

const router = express.Router();

// /api/product

// POST
router.post('/new', authMiddleware, isAdmin, createProduct)

// GET
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)

// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteProduct)
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages)


// PUT
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), resizeProductImg, uploadImages)
router.put("/wishlist", authMiddleware, addToWishlist)
router.put("/rating", authMiddleware, giveRating)
router.put("/edit/:id", authMiddleware, isAdmin, updateProduct)

module.exports = router;
