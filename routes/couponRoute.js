const express = require('express');
const { createCoupon, updateCoupon, deleteCoupon, getSingleCoupon, getAllCoupons } = require('../controllers/couponController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router();

// /api/coupon

// POST
router.post('/new', authMiddleware, isAdmin, createCoupon)

// GET
router.get("/all", getAllCoupons)
router.get("/:id", getSingleCoupon)

// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteCoupon)

// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateCoupon)

module.exports = router;
