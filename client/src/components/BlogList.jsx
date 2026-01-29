import { useState } from 'react'

// Blog categories
import { blogCategories } from '../assets/assets'

// Animation library
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

// Blog card component
import BlogCard from './BlogCard'

// Loader component
import Loader from './Loader'

// Global app context
import { useAppContext } from '../context/AppContext'

/**
 * BlogList
 * - Displays list of blogs
 * - Supports category filtering
 * - Supports search input filtering
 */
const BlogList = () => {

    // Active category menu
    const [menu, setMenu] = useState("All")

    // Blogs and search input from context
    const { blogs, input } = useAppContext()

    /**
     * Filter blogs based on search input
     */
    const filteredBlogs = () => {
        if (input === '') {
            return blogs
        }

        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.category.toLowerCase().includes(input.toLowerCase())
        )
    }

    return (
        <div>
            {/* Category filter menu */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => setMenu(item)}
                            className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'
                                }`}
                        >
                            {item}

                            {/* Animated active indicator */}
                            {menu === item && (
                                <motion.div
                                    layoutId='underline'
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                    className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Blog cards grid */}
            {
                filteredBlogs().length === 0 ? (
                    <Loader />
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                        {filteredBlogs()
                            .filter((blog) =>
                                menu === "All" ? true : blog.category === menu
                            )
                            .map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                    </div>
                )
            }
        </div>
    )
}

export default BlogList