import { useNavigate } from 'react-router-dom'

/**
 * BlogCard
 * Displays a single blog preview card
 * Navigates to blog detail page on click
 */
const BlogCard = ({ blog }) => {

    // Destructure required blog fields
    const { title, description, category, image, _id } = blog

    // React Router navigation helper
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/blog/${_id}`)}
            className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'
        >
            {/* Blog thumbnail */}
            <img src={image} alt="blog" className='aspect-video' />

            {/* Blog category badge */}
            <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>
                {category}
            </span>

            {/* Blog title and short description */}
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>
                    {title}
                </h5>

                {/* Render short HTML snippet safely */}
                <p
                    className='mb-3 text-xs text-gray-600'
                    dangerouslySetInnerHTML={{
                        __html: description.slice(0, 80)
                    }}
                />
            </div>
        </div>
    )
}

export default BlogCard