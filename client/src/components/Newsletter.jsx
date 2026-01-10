import React from 'react'

/**
 * Newsletter
 * Simple email subscription section (UI-only)
 */
const Newsletter = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>

            {/* Section heading */}
            <h1 className='md:text-4xl text-2xl font-semibold'>
                Never miss a blog
            </h1>

            {/* Section description */}
            <p className='md:text-lg text-gray-500/70 pb-8'>
                Subscribe to get the latest blog, new tech, and exclusive news.
            </p>

            {/* Subscription form */}
            <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
                <input
                    type="text"
                    placeholder='Enter your email id'
                    required
                    className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500'
                />

                <button
                    type='submit'
                    className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default Newsletter