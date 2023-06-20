const Product = require("../models/productModel");

const asyncHandler = require('express-async-handler');


// create a new product
const createProduct = asyncHandler(async (req, res) => { 
    res.json({
        message: "Create products here"
    })
})

// update a product
const updateProduct = asyncHandler(async (req, res) => { })

// delete a product
const deleteProduct = asyncHandler(async (req, res) => { })

// get a single product
const getSingleProduct = asyncHandler(async (req, res) => { })

// get all products
const getAllProducts = asyncHandler(async (req, res) => { })

// add product to wishlist
const addToWishlist = asyncHandler(async (req, res) => { })

// give rating to a product
const giveRating = asyncHandler(async (req, res) => { })



module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    addToWishlist,
    giveRating
}