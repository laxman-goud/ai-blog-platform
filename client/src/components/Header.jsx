import { useRef } from 'react'

// Static assets
import { assets } from '../assets/assets'

// Global app context
import { useAppContext } from '../context/AppContext'

/**
 * Header
 * - Displays hero section
 * - Handles blog search input
 */
const Header = () => {

    // Search input state from context
    const { setInput, input } = useAppContext()

    // Ref for uncontrolled input field
    const inputRef = useRef()

    /**
     * Handle search submit
     */
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setInput(inputRef.current.value)
    }

    /**
     * Clear search input
     */
    const onClear = () => {
        setInput('')
        inputRef.current.value = ''
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>

                {/* Announcement badge */}
                <div className='inline-flex items-center justify-center gap-2 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: AI feature added</p>
                    <img src={assets.star_icon} alt="star" />
                </div>

                {/* Hero heading */}
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    Create, publish, and manage
                    <br />
                    <span className='text-primary'>blogs with AI</span>

                </h1>

                {/* Hero description */}
                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                    <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                        QuickBlog is an AI-powered blogging platform that helps creators write
                        better content faster. Generate blogs using AI, publish with ease,
                        and manage everything from a powerful admin dashboard.
                    </p>
                </p>

                {/* Search form */}
                <form
                    onSubmit={onSubmitHandler}
                    className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Search for blogs'
                        required
                        className='w-full pl-4 outline-none'
                    />

                    <button
                        type='submit'
                        className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Clear search button */}
            <div className='text-center'>
                {input && (
                    <button
                        onClick={onClear}
                        className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'
                    >
                        Clear Search
                    </button>
                )}
            </div>

            {/* Decorative background */}
            <img
                src={assets.gradientBackground}
                alt="bg"
                className='absolute -top-50 -z-1 opacity-50'
            />
        </div>
    )
}

export default Header