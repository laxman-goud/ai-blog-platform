import React from 'react'

// App assets
import { assets } from '../../assets/assets'

// Outlet for nested admin routes
import { Outlet } from 'react-router-dom'

// Admin sidebar
import Sidebar from '../../components/admin/Sidebar'

// Global app context
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    // Axios instance, navigation helper, and auth token setter
    const { axios, navigate, setToken } = useAppContext()

    /**
     * Handle admin logout
     * - Clears token from localStorage
     * - Resets auth state
     * - Removes Authorization header
     * - Redirects to home page
     */
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)

        // Remove auth header from axios
        // eslint-disable-next-line react-hooks/immutability
        axios.defaults.headers.common['Authorization'] = null

        navigate('/')
    }

    return (
        <>
            {/* Top navigation bar */}
            <div className='flex items-center justify-between py-2 h-17.5 px-4 sm:px-12 border-b border-gray-200'>
                <img
                    src={assets.logo}
                    alt="logo"
                    className='w-32 sm:w-40 cursor-pointer'
                    onClick={() => navigate('/')}
                />

                <button
                    onClick={logout}
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
                >
                    Logout
                </button>
            </div>

            {/* Sidebar + nested admin pages */}
            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout