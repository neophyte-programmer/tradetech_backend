const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const connection = mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log('🚀 Database connected')
    } catch (error) {
        console.log('Database connection failed')
        throw new Error(error)
    }
}

module.exports = dbConnect