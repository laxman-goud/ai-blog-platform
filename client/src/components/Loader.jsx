import React from 'react'

/**
 * Loader
 * Displays a centered spinning loader
 * Used while fetching async data
 */
const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Spinner animation */}
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700'></div>
        </div>
    )
}

export default Loader