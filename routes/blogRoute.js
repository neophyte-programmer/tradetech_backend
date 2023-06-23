const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controllers/blogController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/blog

// POST
router.post("/new", authMiddleware, isAdmin, createBlog)


// GET
router.get("/all",  getAllBlogs)
router.get("/:id", authMiddleware, isAdmin, getBlog)


// DELETE
router.delete("/drop/:id", deleteBlog)


// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateBlog)




module.exports = router;