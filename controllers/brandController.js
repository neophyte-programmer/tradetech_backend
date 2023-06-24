const Brand = require("../models/brandModel");
const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler")


const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body)
        res.status(200).json({
            message: "Brand created successfully",
            data: newBrand,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Brand updated successfully",
            data: updatedBrand,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.status(200).json({
            message: "Brand deleted successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const singleBrand = await Brand.findById(id)
        if (!singleBrand) throw new Error("Brand not found")
        res.status(200).json({
            data: singleBrand
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const allBrands = await Brand.find()

        res.status(200).json({ data: allBrands })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getSingleBrand,
    getAllBrand
}
