const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000

// ROUTERS
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')



dbConnect() // Connecting to the database


app.use(bodyParser.json()) // Parsing incoming JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Parsing incoming form data
app.use(cookieParser())

// ROUTES
app.use('/api/user', authRouter) // Registering the authentication router at the specified route
app.use('/api/product', productRouter)


// MIDDLEWARES - always after routes
app.use(notFound)
app.use(errorHandler)



// SERVER - always at the end
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})