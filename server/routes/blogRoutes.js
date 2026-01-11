import express from 'express'

// Blog controller functions
import {
    addBlog,
    addComment,
    deleteBlogById,
    generateContent,
    getAllBlogs,
    getBlogById,
    getBlogComments,
    togglePublish
} from '../controllers/blogController.js'

// File upload middleware (Multer)
import upload from '../middlewares/multer.js'

// Authentication middleware
import auth from '../middlewares/auth.js'

// Create blog router instance
const blogRouter = express.Router()

/**
 * @route   POST /api/blog/add
 * @desc    Create a new blog with image upload
 * @access  Protected (Admin only)
 */
blogRouter.post(
    '/add',
    upload.single('image'), // Handle thumbnail upload
    auth,                   // Verify admin authentication
    addBlog
)

/**
 * @route   GET /api/blog/all
 * @desc    Fetch all published blogs (public)
 * @access  Public
 */
blogRouter.get('/all', getAllBlogs)

/**
 * @route   GET /api/blog/:blogId
 * @desc    Fetch a single blog by ID
 * @access  Public
 */
blogRouter.get('/:blogId', getBlogById)

/**
 * @route   POST /api/blog/delete
 * @desc    Delete a blog by ID
 * @access  Protected (Admin only)
 */
blogRouter.post('/delete', auth, deleteBlogById)

/**
 * @route   POST /api/blog/toggle-publish
 * @desc    Publish or unpublish a blog
 * @access  Protected (Admin only)
 */
blogRouter.post('/toggle-publish', auth, togglePublish)

/**
 * @route   POST /api/blog/add-comment
 * @desc    Add a new comment to a blog
 * @access  Protected (Authenticated user/admin)
 */
blogRouter.post('/add-comment', auth, addComment)

/**
 * @route   POST /api/blog/comments
 * @desc    Fetch all approved comments for a blog
 * @access  Public
 */
blogRouter.post('/comments', getBlogComments)

/**
 * @route   POST /api/blog/generate
 * @desc    Generate blog content using AI (Gemini)
 * @access  Protected (Admin only)
 */
blogRouter.post('/generate', auth, generateContent)

export default blogRouter