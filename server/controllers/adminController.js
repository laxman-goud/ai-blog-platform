import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

/**
 * Admin Login Controller
 * - Validates admin credentials from environment variables
 * - Generates JWT token on successful login
 */
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate admin credentials
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // Create JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Fetch all blogs for admin dashboard
 * - Returns all blogs (published + drafts)
 * - Sorted by latest first
 */
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Fetch all comments for admin panel
 * - Populates related blog data
 * - Sorted by latest first
 */
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('blog')
            .sort({ createdAt: -1 })

        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Dashboard analytics data
 * - Recent blogs
 * - Total blogs
 * - Total comments
 * - Draft count
 */
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .limit(5)

        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({ isPublished: false })

        res.json({
            success: true,
            dashboardData: {
                recentBlogs,
                blogs,
                comments,
                drafts
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Delete a comment by ID
 */
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndDelete(id)

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Approve a comment
 * - Marks comment as approved
 * - Makes it visible on blog page
 */
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body

        const comment = await Comment.findById(id)
        comment.isApproved = true

        await comment.save()

        res.json({
            success: true,
            message: 'Comment approved successfully'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}