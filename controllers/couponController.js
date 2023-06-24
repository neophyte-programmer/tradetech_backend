const Coupon = require('../models/couponModel');
const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)

        res.status(200).json({
            message: "Coupon created successfully",
            data: newCoupon,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const singleCoupon = await Coupon.findById(id)
        if (!singleCoupon) throw new Error("Coupon not found")
        res.status(200).json({
            data: singleCoupon
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const allCoupons = await Coupon.find()
        res.status(200).json({
            data: allCoupons
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body,
            {new: true}
        )
        res.status(200).json({
            message: "Coupon updated successfully",
            data: updatedCoupon,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id)
        res.status(200).json({
            message: "Coupon deleted successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createCoupon,
    getSingleCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon
}