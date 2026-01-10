/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Static assets (icons, backgrounds)
import { assets } from '../assets/assets'

// Shared layout components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

// Date formatting utility
import Moment from 'moment'

// Global app context (axios instance)
import { useAppContext } from '../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

const Blog = () => {

    // Extract blog ID from URL params
    const { id } = useParams()

    // Axios instance from global context
    const { axios } = useAppContext()

    // Blog data state
    const [data, setData] = useState(null)

    // Comments state
    const [comments, setComments] = useState([])

    // New comment form state
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    /**
     * Fetch single blog details by ID
     */
    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`)
            data.success ? setData(data.blog) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Fetch all approved comments related to the blog
     */
    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id })

            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Submit a new comment for the blog
     */
    const addComment = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/blog/add-comment', {
                blog: id,
                name,
                content
            })

            if (data.success) {
                // Reset form after successful submission
                setName('')
                setContent('')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Load blog data and comments on initial render
    useEffect(() => {
        fetchBlogData()
        fetchComments()
    }, [])

    // Show loader until blog data is available
    return data ? (
        <div className='relative'>
            {/* Decorative background */}
            <img
                src={assets.gradientBackground}
                alt="bg"
                className='absolute -top-50 -z-1 opacity-50'
            />

            {/* Page navigation */}
            <Navbar />

            {/* Blog header section */}
            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>
                    Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                </p>

                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {data.title}
                </h1>

                <h2 className='my-5 max-w-lg truncate mx-auto'>
                    {data.subTitle}
                </h2>

                {/* Static author label (can be dynamic later) */}
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                    Micheal Brown
                </p>
            </div>

            {/* Blog content section */}
            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img
                    src={data.image}
                    alt="blog"
                    className='rounded-3xl mb-5'
                />

                {/* Render rich HTML content */}
                <div
                    className='rich-text max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />

                {/* Comments list */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>
                        Comments ({comments.length})
                    </p>

                    <div>
                        {comments.map((item, index) => (
                            <div
                                key={index}
                                className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'
                            >
                                <div className='flex items-center gap-2 mb-2'>
                                    <img
                                        src={assets.user_icon}
                                        alt="user"
                                        className='w-6'
                                    />
                                    <p className='font-medium'>{item.name}</p>
                                </div>

                                {/* Comment content */}
                                <p className='text-sm max-w-md ml-8'>
                                    {item.content}
                                </p>

                                {/* Comment timestamp */}
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                                    {Moment(item.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add comment form */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Add your comment</p>

                    <form
                        onSubmit={addComment}
                        className='flex flex-col items-start gap-4 max-w-lg'
                    >
                        <input
                            type="text"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none'
                        />

                        <textarea
                            placeholder='Comment'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                        />

                        <button
                            type='submit'
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Social sharing section */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>
                        Share this article on social media
                    </p>

                    <div className='flex'>
                        <img src={assets.facebook_icon} width={50} alt="facebook" />
                        <img src={assets.twitter_icon} width={50} alt="twitter" />
                        <img src={assets.googleplus_icon} width={50} alt="google-plus" />
                    </div>
                </div>
            </div>

            {/* Page footer */}
            <Footer />
        </div>
    ) : (
        // Fallback loader while fetching data
        <Loader />
    )
}

export default Blog