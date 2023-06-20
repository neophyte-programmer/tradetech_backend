const Product = require("../models/productModel");
const slugify = require('slugify');

const asyncHandler = require('express-async-handler');


// create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true
            })
        }
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
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.json({
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        throw new Error(error)
    }
})

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {

        const deletedProduct = await Product.findByIdAndDelete(id)
        res.json({
            message: "Product deleted successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

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
    try {
        // Filtering 
        const queryObject = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields']; // exclude these fields from query
        excludeFields.forEach(el => delete queryObject[el]); // delete these fields from query

        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        const products = await query
        res.json(products)
    } catch (error) {
        throw new Error(error)
    }
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