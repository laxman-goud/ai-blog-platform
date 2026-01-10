/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'

// Table row component
import BlogTableItem from '../../components/admin/BlogTableItem'

// Global app context
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

const ListBlog = () => {

    // All blogs list
    const [blogs, setBlogs] = useState([])

    // Axios instance
    const { axios } = useAppContext()

    /**
     * Fetch all blogs for admin view
     */
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Load blogs on component mount
    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:py-12 sm:pl-16 bg-blue-50/50'>
            <h1>All blogs</h1>

            {/* Blogs table */}
            <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                            <th scope='col' className='px-2 py-4'>Blog Title</th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                            <th scope='col' className='px-2 py-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <BlogTableItem
                                key={index}
                                blog={blog}
                                index={index + 1}
                                fetchBlogs={fetchBlogs}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBlog