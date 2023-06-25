const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controllers/blogController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, resizeBlogImg } = require('../middlewares/uploadImages');

const router = express.Router();

// /api/blog

// POST
router.post("/new", authMiddleware, isAdmin, createBlog)


// GET
router.get("/all", getAllBlogs)
router.get("/:id", getBlog)


// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteBlog)


// PUT
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 2), resizeBlogImg, uploadImages)
router.put("/edit/:id", authMiddleware, isAdmin, updateBlog)
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);



module.exports = router;