import React from 'react'

/**
 * Loader
 * Displays a centered spinning loader
 * Used while fetching async data
 */
const Loader = () => {
    return (
        <div className='flex justify-center items-center'>
            {/* Spinner animation */}
            <div className='animate-spin rounded-full h-10 w-10 border-4 border-t-white border-primary/80'></div>
        </div>
    )
}

export default Loader