const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const fs = require("fs")

const { cloudinaryUploadImg } = require("../utils/cloudinary");
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
    validateMongodbId(id)
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
    const { id } = req.params
    validateMongodbId(id)
    try {
        const singleBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        if (!singleBlog) throw new Error("Blog not found")
        // when user gets a blog, increment the number of views
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

        res.status(200).json({ data: allBlogs })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.status(200).json({
            message: "Blog deleted successfully",
            data: deletedBlog,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body
    validateMongodbId(blogId)

    try {
        // find blog to be liked
        const blog = await Blog.findById(blogId)
        // find user who is liking the blog
        const loginUserId = req?.user?._id

        // if user has liked post
        const isLiked = blog?.isLiked

        // if user has disliked post
        const isAlreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString())

        if (isAlreadyDisliked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        }
        if (isLiked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $push: { likes: loginUserId },
                isLiked: true
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        }

    } catch (error) {
        throw new Error(error)
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body
    validateMongodbId(blogId)

    try {
        // find blog to be disliked
        const blog = await Blog.findById(blogId)
        // find user who is disliking the blog
        const loginUserId = req?.user?._id

        // if user has disliked post
        const isDisliked = blog?.isDisliked

        // if user has disliked post
        const isAlreadyLiked = blog?.likes?.find((userId) => userId?.toString() === loginUserId?.toString())

        if (isAlreadyLiked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        }
        if (isDisliked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $push: { dislikes: loginUserId },
                isDisiked: true
            }, {
                new: true
            })
            res.status(200).json({
                data: updatedBlog,
            })
        }

    } catch (error) {
        throw new Error(error)
    }
})

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params // get product id from params
    validateMongodbId(id)
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images")
        const urls = []
        const files = req.files

        for (const file of files) {
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }

        const findBlog = await Blog.findByIdAndUpdate(id, {
            images: urls.map((file) => { return file })
        }, { new: true })
        res.status(200).json({
            message: "Images added to blog",
            data: findBlog
        })
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