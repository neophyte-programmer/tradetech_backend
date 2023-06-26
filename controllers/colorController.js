const Color = require("../models/colorModel");
const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler")


const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await Color.create(req.body)
        res.status(200).json({
            message: "Color created successfully",
            data: newColor,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Color updated successfully",
            data: updatedColor,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const deletedColor = await Color.findByIdAndDelete(id)
        res.status(200).json({
            message: "Color deleted successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const singleColor = await Color.findById(id)
        if (!singleColor) throw new Error("Color not found")
        res.status(200).json({
            data: singleColor
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllColor = asyncHandler(async (req, res) => {
    try {
        const allColors = await Color.find()

        res.status(200).json({ data: allColors })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createColor,
    updateColor,
    deleteColor,
    getSingleColor,
    getAllColor
}
