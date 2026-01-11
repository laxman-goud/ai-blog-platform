import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import main from '../configs/gemini.js'

/**
 * Add new blog
 * - Parses blog JSON data
 * - Uploads image to ImageKit
 * - Stores optimized image URL
 */
export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } =
            JSON.parse(req.body.blog)

        const imageFile = req.file

        // Validate required fields
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: 'All fields are required'
            })
        }

        // Read uploaded image
        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // Generate optimized image URL
        const image = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        })

        // Create blog document
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        })

        res.json({ success: true, message: 'Blog added successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Fetch all published blogs (public API)
 */
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Fetch single blog by ID
 */
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params

        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.json({
                success: false,
                message: 'Blog not found'
            })
        }

        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Delete blog by ID
 * - Also deletes all related comments
 */
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body

        await Blog.findByIdAndDelete(id)
        await Comment.deleteMany({ blog: id })

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Toggle publish/unpublish status
 */
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body

        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished

        await blog.save()

        res.json({
            success: true,
            message: 'Blog status updated'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Add comment to a blog
 * - Comments require admin approval
 */
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body

        await Comment.create({
            blog,
            name,
            content
        })

        res.json({
            success: true,
            message: 'Comment added for review'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Fetch approved comments for a blog
 */
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body

        const comments = await Comment.find({
            blog: blogId,
            isApproved: true
        }).sort({ createdAt: -1 })

        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * Generate blog content using Gemini AI
 */
export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body

        const content = await main(
            prompt +
                ' Generate a blog content for this topic in simple text format'
        )

        res.json({ success: true, content })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}