import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

/**
 * NotFound Page (404)
 * Displays when user visits an unknown route
 */
const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">

            {/* Background Gradient */}
            <img
                src={assets.gradientBackground}
                alt="background"
                className="absolute -top-40 -z-10 opacity-50"
            />

            {/* 404 Number */}
            <h1 className="text-7xl sm:text-9xl font-bold text-primary">
                404
            </h1>

            {/* Title */}
            <h2 className="mt-4 text-2xl sm:text-4xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-md text-gray-500">
                Oops! The page you’re looking for doesn’t exist or may have been moved.
                Let’s get you back to exploring great blogs.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-primary text-white rounded-full hover:scale-105 transition-all cursor-pointer"
                >
                    Go Home
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                    Go Back
                </button>
            </div>

            {/* Extra decorative text */}
            <p className="mt-10 text-sm text-gray-400">
                QuickBlog • AI Powered Blogging Platform
            </p>

        </div>
    )
}

export default NotFound