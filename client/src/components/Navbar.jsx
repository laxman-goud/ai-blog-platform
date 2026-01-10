import React from 'react'

// Static assets
import { assets } from '../assets/assets'

// Global app context
import { useAppContext } from '../context/AppContext'

/**
 * Navbar
 * - Displays logo
 * - Handles navigation
 * - Shows Login or Dashboard based on auth state
 */
const Navbar = () => {

    // Navigation helper and auth token
    const { navigate, token } = useAppContext()

    return (
        <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">

            {/* Logo - navigates to home */}
            <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt="logo"
                className="w-32 sm:w-44 cursor-pointer"
            />

            {/* Auth action button */}
            <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
            >
                {token ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>

        </div>
    )
}

export default Navbar