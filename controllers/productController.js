const Product = require("../models/productModel");
const User = require("../models/userModel");
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
            data: newProduct
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
            data: updatedProduct
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

        // Limit fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select("-__v")
        }

        // Pagination
        const page = req.query.page;
        const limit = req.query.limit
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This Page does not exists");
        }

        const products = await query
        res.json({ data: products })
    } catch (error) {
        throw new Error(error)
    }
})

// add product to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    // console.log(_id, productId);

    try {
        const user = await User.findById(_id)
        const isAlreadyAdded = user.wishlist.find((id) => id.toString() === productId)



        if (isAlreadyAdded) {
            let updatedUser = await User.findByIdAndUpdate(_id,
                { $pull: { wishlist: productId } },
                { new: true }
            )
            res.status(200).json({
                message: "Product removed from wishlist",
                data: updatedUser
            })
        } else {
            let updatedUser = await User.findByIdAndUpdate(_id,
                { $push: { wishlist: productId } },
                { new: true }
            )
            res.status(200).json({
                message: "Product added to wishlist",
                data: updatedUser
            })
        }

    } catch (error) {
        throw new Error(error)
    }


})

// give rating to a product
const giveRating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId, star, comment } = req.body;
    try {
        const product = await Product.findById(productId)
        let isAlreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString())

        if (isAlreadyRated) {
            const updateRating = await Product.updateOne(
                { ratings: { $elemMatch: isAlreadyRated } },
                { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
                { new: true }
            )
        } else {
            const rateProduct = await Product.findByIdAndUpdate(productId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                }
            }, {
                new: true
            })
        }

        const getAllRatings = await Product.findById(productId)
        let totalRating = getAllRatings.ratings.length
        let ratingSum = getAllRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0)
        
        let actualRating = Math.round(ratingSum / totalRating)
        let finalProduct = await Product.findByIdAndUpdate(productId,
            { totalrating: actualRating },
            { new: true }
        )

        res.status(200).json({
            message: "Product rated successfully",
            data: finalProduct
        })


    } catch (error) {
        throw new Error(error)
    }
})





module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    addToWishlist,
    giveRating
}