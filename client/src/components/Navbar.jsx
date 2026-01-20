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

            <div className="flex gap-4">
                <a
                    href="https://github.com/laxman-thedev/ai-blog-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="hidden sm:flex items-center justify-center gap-2 text-primary border border-primary px-3 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all"
                >
                    {/* GitHub Icon */}
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 
                                            10.32 10.32 0 0 0-3.393 6.17 
                                            10.48 10.48 0 0 0 1.317 6.955 
                                            10.045 10.045 0 0 0 5.4 4.418
                                            c.504.095.683-.223.683-.494 
                                            0-.245-.01-1.052-.014-1.908
                                            -2.78.62-3.366-1.21-3.366-1.21
                                            a2.711 2.711 0 0 0-1.11-1.5
                                            c-.907-.637.07-.621.07-.621
                                            .317.044.62.163.885.346
                                            .266.183.487.426.647.71
                                            .135.253.318.476.538.655
                                            a2.079 2.079 0 0 0 2.37.196
                                            c.045-.52.27-1.006.635-1.37
                                            -2.219-.259-4.554-1.138-4.554-5.07
                                            a4.022 4.022 0 0 1 1.031-2.75
                                            3.77 3.77 0 0 1 .096-2.713
                                            s.839-.275 2.749 1.05
                                            a9.26 9.26 0 0 1 5.004 0
                                            c1.906-1.325 2.74-1.05 2.74-1.05
                                            .37.858.406 1.828.101 2.713
                                            a4.017 4.017 0 0 1 1.029 2.75
                                            c0 3.939-2.339 4.805-4.564 5.058
                                            a2.471 2.471 0 0 1 .679 1.897
                                            c0 1.372-.012 2.477-.012 2.814
                                            0 .272.18.592.687.492
                                            a10.05 10.05 0 0 0 5.388-4.421
                                            10.473 10.473 0 0 0 1.313-6.948
                                            10.32 10.32 0 0 0-3.39-6.165
                                            A9.847 9.847 0 0 0 12.007 2Z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <span>Star on GitHub</span>
                </a>
                {/* Auth action button */}
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
                >
                    {token ? 'Dashboard' : 'Login'}
                    <img src={assets.arrow} alt="arrow" className="w-3" />
                </button>
            </div>


        </div>
    )
}

export default Navbar