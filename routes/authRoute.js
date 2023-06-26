const express = require('express');
const {
    createUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    generateForgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    createUserCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    getAllOrders,
    getOrderByUserId,
} = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/user

// POST
router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/admin-login', loginAdmin)
router.post("/forgot-password-token", generateForgotPasswordToken)
router.post("/cart/create", authMiddleware, createUserCart)
router.post("/cart/apply-coupon", authMiddleware, applyCoupon)
router.post("/order/cash/create", authMiddleware, createOrder)

// GET
router.get('/all', getAllUsers)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getSingleUser)

// DELETE
router.delete("/cart/empty", authMiddleware, emptyCart);
router.delete("/:id", deleteUser)


// PUT
router.put("/password", authMiddleware, updatePassword)
router.put("/save-address", authMiddleware, saveAddress)
router.put("/edit", authMiddleware, updateUser)
router.put("/block/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser)
router.put("/reset-password/:token", resetPassword)

module.exports = router;