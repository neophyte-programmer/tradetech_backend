const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler")


const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json({
            message: "Blog created successfully",
            data: newBlog,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Blog updated successfully",
            data: updatedBlog,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params 
        const singleBlog = await Blog.findById(id)
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
              $inc: { numViews: 1 },
            },
            { new: true }
          );
        res.status(200).json({
            data: singleBlog
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const allBlogs = await Blog.find()
        res.status(200).json({data: allBlogs})
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})

const uploadImages = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImages,
}