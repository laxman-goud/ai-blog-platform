import mongoose from "mongoose"

/**
 * Connects the application to MongoDB
 * - Uses MONGODB_URI from environment variables
 * - Appends database name (`quickblog`)
 * - Logs successful connection
 */
const connectDB = async () => {
    try {
        // Listen for successful MongoDB connection
        mongoose.connection.on('connected', () =>
            console.log('Database connected')
        )

        // Connect to MongoDB cluster
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
    } catch (error) {
        // Log any connection errors
        console.log(error.message)
    }
}

export default connectDB