const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/authRoute')
const bodyParser = require('body-parser')

dbConnect() // Connecting to the database

app.use(bodyParser.json()) // Parsing incoming JSON data

app.use('/api/user', authRouter) // Registering the authentication router at the specified route

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})