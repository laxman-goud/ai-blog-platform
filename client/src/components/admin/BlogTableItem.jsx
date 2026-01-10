import React from 'react'

// Icons and assets
import { assets } from '../../assets/assets'

// Global app context
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

/**
 * BlogTableItem
 * Displays a single blog row inside admin tables
 * Provides actions to publish/unpublish and delete a blog
 */
const BlogTableItem = ({ blog, fetchBlogs, index }) => {

    // Destructure required blog fields
    const { title, createdAt } = blog

    // Format blog creation date
    const BlogDate = new Date(createdAt)

    // Axios instance
    const { axios } = useAppContext()

    /**
     * Delete a blog after confirmation
     */
    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?')
        if (!confirm) return

        try {
            const { data } = await axios.post('/api/blog/delete', {
                id: blog._id
            })

            if (data.success) {
                await fetchBlogs()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Toggle blog publish status
     */
    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', {
                id: blog._id
            })

            if (data.success) {
                await fetchBlogs()
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
            <th className='px-2 py-4'>{index}</th>

            <td className='px-2 py-4'>{title}</td>

            <td className='px-2 py-4 max-sm:hidden'>
                {BlogDate.toDateString()}
            </td>

            {/* Publish status */}
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? 'text-green-500' : 'text-orange-700'}`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>

            {/* Action buttons */}
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button
                    onClick={togglePublish}
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                </button>

                <img
                    onClick={deleteBlog}
                    src={assets.cross_icon}
                    alt="delete"
                    className='w-8 hover:scale-110 transition-all cursor-pointer'
                />
            </td>
        </tr>
    )
}

export default BlogTableItem