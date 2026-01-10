import React from 'react'

// Icons and assets
import { assets } from '../../assets/assets'

// Global app context
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

/**
 * CommentTableItem
 * Displays a single comment row for admin moderation
 * Allows approving or deleting comments
 */
const CommentTableItem = ({ comment, fetchComments }) => {

    // Destructure required comment fields
    const { blog, createdAt, _id } = comment

    // Format comment date
    const BlogDate = new Date(createdAt)

    // Axios instance
    const { axios } = useAppContext()

    /**
     * Approve a pending comment
     */
    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', {
                id: _id
            })

            if (data.success) {
                await fetchComments()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Delete a comment after confirmation
     */
    const deleteComment = async () => {
        const confirm = window.confirm('Are you sure you want to delete this comment?')
        if (!confirm) return

        try {
            const { data } = await axios.post('/api/admin/delete-comment', {
                id: _id
            })

            if (data.success) {
                await fetchComments()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            {/* Comment details */}
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                <br /><br />
                <b className='font-medium text-gray-600'>Name</b> : {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
            </td>

            {/* Comment date */}
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toDateString()}
            </td>

            {/* Moderation actions */}
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>

                    {!comment.isApproved ? (
                        <img
                            onClick={approveComment}
                            src={assets.tick_icon}
                            alt="approve"
                            className='w-5 hover:scale-110 transition-all cursor-pointer'
                        />
                    ) : (
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                            Approved
                        </p>
                    )}

                    <img
                        onClick={deleteComment}
                        src={assets.bin_icon}
                        alt="delete"
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem