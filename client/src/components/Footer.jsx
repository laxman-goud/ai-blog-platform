import React from 'react'

// Footer assets and static data
import { assets, footer_data } from '../assets/assets'

/**
 * Footer
 * Displays branding and navigation links
 */
const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

                {/* Brand section */}
                <div>
                    <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
                    <p className='max-w-102.5 mt-6'>
                        QuickBlog is an AI-powered blogging platform, 
                        designed to help creators write, publish, and manage content effortlessly.
                        It features AI-assisted blog generation, admin moderation, and a modern,
                        responsive reading experience.
                    </p>

                </div>

                {/* Footer links */}
                <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                                {section.title}
                            </h3>

                            <ul className='text-sm space-y-1'>
                                {section.links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className='hover:underline transition'
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            {/* Copyright */}
            <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
                Copyright 2026  <a href={import.meta.env.VITE_PORTFOLIO_URL} className='underline' >Laxman</a> – All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer