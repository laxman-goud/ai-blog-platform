import mongoose from 'mongoose'

/**
 * Blog Schema
 * Represents a blog post created by admin
 */
const blogSchema = new mongoose.Schema(
    {
        // Main blog title
        title: {
            type: String,
            required: true
        },

        // Optional subtitle shown below the title
        subTitle: {
            type: String
        },

        // Blog content (HTML string generated from editor / AI)
        description: {
            type: String,
            required: true
        },

        // Blog category (e.g., Technology, Startup, Lifestyle)
        category: {
            type: String,
            required: true
        },

        // Blog thumbnail image URL (ImageKit)
        image: {
            type: String,
            required: true
        },

        // Publish status (true = visible to users)
        isPublished: {
            type: Boolean,
            required: true
        }
    },
    {
        // Automatically adds createdAt and updatedAt timestamps
        timestamps: true
    }
)

// Create Blog model
const Blog = mongoose.model('blog', blogSchema)

export default Blog