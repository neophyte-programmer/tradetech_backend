const express = require('express');
const { createEnquiry, updateEnquiry, getSingleEnquiry, getAllEnquiry, deleteEnquiry } = require('../controllers/enquiryController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/enquiry

// POST
router.post("/new", createEnquiry)

// GET
router.get("/all", getAllEnquiry)
router.get("/:id", getSingleEnquiry)


// DELETE
router.delete("/drop/:id", authMiddleware, isAdmin, deleteEnquiry)


// PUT
router.put("/edit/:id", authMiddleware, isAdmin, updateEnquiry)

module.exports = router;
