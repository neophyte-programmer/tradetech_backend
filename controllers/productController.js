const Product = require("../models/productModel");

const asyncHandler = require('express-async-handler');


// create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.json({
            message: "Product created successfully",
            product: newProduct
        })
    } catch (error) {
        throw new Error(error)
    }
})

// update a product
const updateProduct = asyncHandler(async (req, res) => { })

// delete a product
const deleteProduct = asyncHandler(async (req, res) => { })

// get a single product
const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
})

// get all products
const getAllProducts = asyncHandler(async (req, res) => {

})

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