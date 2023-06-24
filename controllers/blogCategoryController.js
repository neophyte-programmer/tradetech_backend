const BlogCategory = require("../models/blogCategoryModel");
const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler")


const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await BlogCategory.create(req.body)
        res.status(200).json({
            message: "Category created successfully",
            data: newCategory,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(id)
        res.status(200).json({
            message: "Category deleted successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const singleCategory = await BlogCategory.findById(id)
        if (!singleCategory) throw new Error("Category not found")
        res.status(200).json({
            data: singleCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const allCategory = await BlogCategory.find()

        res.status(200).json({ data: allCategory })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory,
    getAllCategory
}
