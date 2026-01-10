/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'

// Dashboard icons and assets
import { assets } from '../../assets/assets'

// Table row component for recent blogs
import BlogTableItem from '../../components/admin/BlogTableItem'

// Global app context
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

const Dashboard = () => {

    // Dashboard statistics and recent blogs
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    // Axios instance from context
    const { axios } = useAppContext()

    /**
     * Fetch dashboard statistics and recent blogs
     */
    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            data.success
                ? setDashboardData(data.dashboardData)
                : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Load dashboard data on component mount
    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

            {/* Summary cards */}
            <div className='flex flex-wrap gap-4'>

                {/* Total blogs */}
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_1} alt="blogs" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>
                            {dashboardData.blogs}
                        </p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>

                {/* Total comments */}
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_2} alt="comments" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>
                            {dashboardData.comments}
                        </p>
                        <p className='text-gray-400 font-light'>Comments</p>
                    </div>
                </div>

                {/* Draft blogs */}
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_3} alt="drafts" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>
                            {dashboardData.drafts}
                        </p>
                        <p className='text-gray-400 font-light'>Drafts</p>
                    </div>
                </div>

            </div>

            {/* Recent blogs table */}
            <div>
                <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                    <img src={assets.dashboard_icon_4} alt="latest blogs" />
                    <p>Latest Blogs</p>
                </div>

                <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left uppercase'>
                            <tr>
                                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                                <th scope='col' className='px-2 py-4'>Blog Title</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                                <th scope='col' className='px-2 py-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => (
                                <BlogTableItem
                                    key={index}
                                    blog={blog}
                                    index={index + 1}
                                    fetchBlogs={fetchDashboard}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Dashboard