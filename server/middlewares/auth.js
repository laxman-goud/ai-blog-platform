import jwt from 'jsonwebtoken'

/**
 * auth middleware
 * Verifies JWT token sent in request headers
 * Protects admin and authenticated routes
 */
const auth = (req, res, next) => {

    // Extract token from Authorization header
    const token = req.headers.authorization

    try {
        // Verify token using secret key
        jwt.verify(token, process.env.JWT_SECRET)

        // Token is valid, proceed to next middleware/controller
        next()
    } catch (error) {
        // Token is invalid or missing
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default auth