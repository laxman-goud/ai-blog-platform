import mongoose from 'mongoose'

/**
 * Comment Schema
 * Represents a user comment on a blog post
 */
const commentSchema = new mongoose.Schema(
    {
        // Reference to the related blog
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog',
            required: true
        },

        // Name of the commenter
        name: {
            type: String,
            required: true
        },

        // Comment text content
        content: {
            type: String,
            required: true
        },

        // Approval status (false by default)
        isApproved: {
            type: Boolean,
            default: false
        }
    },
    {
        // Automatically adds createdAt and updatedAt timestamps
        timestamps: true
    }
)

// Create Comment model
const Comment = mongoose.model('Comment', commentSchema)

export default Comment