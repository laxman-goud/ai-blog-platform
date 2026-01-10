/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

// Set base URL for all axios requests (from Vite env)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// Create global application context
const AppContext = createContext()

/**
 * AppProvider
 * Wraps the entire application and provides:
 * - Authentication state
 * - Global blog data
 * - Search input state
 * - Axios instance
 * - Navigation helper
 */
export const AppProvider = ({ children }) => {

    // React Router navigation helper
    const navigate = useNavigate()

    // Auth token state
    const [token, setToken] = useState(null)

    // All published blogs
    const [blogs, setBlogs] = useState([])

    // Search input (used for filtering blogs)
    const [input, setInput] = useState("")

    /**
     * Fetch all published blogs (public API)
     */
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success
                ? setBlogs(data.blogs)
                : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Initial setup on app load:
     * - Fetch blogs
     * - Restore auth token from localStorage
     * - Attach Authorization header to axios
     */
    useEffect(() => {
        fetchBlogs()

        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    }, [])

    // Values exposed to entire app
    const value = {
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        navigate,
        axios
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

/**
 * Custom hook for accessing AppContext
 */
export const useAppContext = () => {
    return useContext(AppContext)
}