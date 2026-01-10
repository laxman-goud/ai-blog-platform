import React from 'react'

// Routing utilities
import { Route, Routes } from 'react-router-dom'

// Public pages
import Home from './pages/Home'
import Blog from './pages/Blog'

// Admin layout and pages
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Comments from './pages/admin/Comments'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'

// Admin login component
import Login from './components/admin/Login'

// Quill editor styles (used in AddBlog)
import 'quill/dist/quill.snow.css'

// Toast notifications
import { Toaster } from 'react-hot-toast'

// Global app context
import { useAppContext } from './context/AppContext'

const App = () => {
  // Get auth token from context
  const { token } = useAppContext()

  return (
    <div>
      {/* Global toast notifications */}
      <Toaster />

      {/* Application routes */}
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />

        {/* Admin routes (protected by auth token) */}
        <Route
          path='/admin'
          element={token ? <Layout /> : <Login />}
        >
          {/* Default admin dashboard */}
          <Route index element={<Dashboard />} />

          {/* Admin sub-pages */}
          <Route path='comments' element={<Comments />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App