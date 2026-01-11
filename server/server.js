import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Database connection helper
import connectDB from './configs/db.js'

// Route handlers
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'

// Initialize Express app
const app = express()

/**
 * Connect to MongoDB
 * Uses environment variables defined in .env
 */
await connectDB()

/**
 * Global Middlewares
 */

// Enable Cross-Origin Resource Sharing
app.use(cors())

// Parse incoming JSON requests
app.use(express.json())

/**
 * Routes
 */

// Health check / root endpoint
app.get('/', (req, res) => {
    res.send('API is Working!')
})

// Admin-related APIs (auth, dashboard, comments, etc.)
app.use('/api/admin', adminRouter)

// Blog-related APIs (CRUD, comments, AI generation, etc.)
app.use('/api/blog', blogRouter)

/**
 * Server configuration
 */

// Use PORT from environment or fallback to 3000
const PORT = process.env.PORT || 3000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// Export app for testing or serverless usage
export default app