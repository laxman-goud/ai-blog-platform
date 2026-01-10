import React, { useState } from 'react'

// Global app context
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

/**
 * Login
 * Admin authentication form
 */
const Login = () => {

    // Axios instance and token setter
    const { axios, setToken } = useAppContext()

    // Form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /**
     * Handle admin login submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/admin/login', {
                email,
                password
            })

            if (data.success) {
                // Persist token and attach auth header
                localStorage.setItem('token', data.token)
                setToken(data.token)

                // eslint-disable-next-line react-hooks/immutability
                axios.defaults.headers.common['Authorization'] = `${data.token}`
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>

                    {/* Header */}
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'>
                            <span className='text-primary'>Admin</span> Login
                        </h1>
                        <p className='font-light'>
                            Enter your login details to access the admin panel
                        </p>
                    </div>

                    {/* Login form */}
                    <form
                        onSubmit={handleSubmit}
                        className='mt-6 w-full sm:max-w-md text-gray-600'
                    >
                        <div className='flex flex-col'>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                placeholder='your email id'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                placeholder='your password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login