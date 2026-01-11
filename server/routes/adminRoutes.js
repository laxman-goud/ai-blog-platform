import express from 'express'

// Admin controller functions
import {
    adminLogin,
    approveCommentById,
    deleteCommentById,
    getAllBlogsAdmin,
    getAllComments,
    getDashboard
} from '../controllers/adminController.js'

// Authentication middleware
import auth from '../middlewares/auth.js'

// Create admin router instance
const adminRouter = express.Router()

/**
 * @route   POST /api/admin/login
 * @desc    Admin login (returns JWT token)
 * @access  Public
 */
adminRouter.post('/login', adminLogin)

/**
 * @route   GET /api/admin/comments
 * @desc    Fetch all comments for admin moderation
 * @access  Protected (Admin only)
 */
adminRouter.get('/comments', auth, getAllComments)

/**
 * @route   GET /api/admin/blogs
 * @desc    Fetch all blogs (admin view)
 * @access  Protected (Admin only)
 */
adminRouter.get('/blogs', auth, getAllBlogsAdmin)

/**
 * @route   POST /api/admin/delete-comment
 * @desc    Delete a comment by ID
 * @access  Protected (Admin only)
 */
adminRouter.post('/delete-comment', auth, deleteCommentById)

/**
 * @route   POST /api/admin/approve-comment
 * @desc    Approve a comment by ID
 * @access  Protected (Admin only)
 */
adminRouter.post('/approve-comment', auth, approveCommentById)

/**
 * @route   GET /api/admin/dashboard
 * @desc    Fetch dashboard stats (blogs, comments, drafts, recent blogs)
 * @access  Protected (Admin only)
 */
adminRouter.get('/dashboard', auth, getDashboard)

export default adminRouter