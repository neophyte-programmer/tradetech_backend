const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const morgan = require('morgan')

const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cors = require("cors");

const app = express()
const PORT = process.env.PORT || 4000

// ROUTERS
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoute')
const productCategoryRouter = require('./routes/productCategoryRoute')
const blogCategoryRouter = require('./routes/blogCategoryRoute')
const brandRouter = require('./routes/brandRoute')
const colorRouter = require('./routes/colorRoute')
const enquiryRouter = require('./routes/enquiryRoute')
const couponRouter = require('./routes/couponRoute')



dbConnect() // Connecting to the database


const corsOptions = {
    origin: true,
    credentials: true,
}

app.use(cors(corsOptions))

app.use(morgan("dev")) // Logging incoming requests
app.use(bodyParser.json()) // Parsing incoming JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Parsing incoming form data
app.use(cookieParser())

// ROUTES
app.use('/api/user', authRouter) // Registering the authentication router at the specified route
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/productCategory', productCategoryRouter)
app.use('/api/blogCategory', blogCategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/color', colorRouter)
app.use('/api/enquiry', enquiryRouter)
app.use('/api/coupon', couponRouter)


// MIDDLEWARES - always after routes
app.use(notFound)
app.use(errorHandler)



// SERVER - always at the end
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})