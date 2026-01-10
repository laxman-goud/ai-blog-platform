import React, { useEffect, useRef, useState } from 'react'

// Static assets and predefined blog categories
import { assets, blogCategories } from '../../assets/assets'

// Rich text editor
import Quill from 'quill'

// Global app context (axios instance)
import { useAppContext } from '../../context/AppContext'

// Toast notifications
import toast from 'react-hot-toast'

// Markdown to HTML parser (used for AI-generated content)
import { parse } from 'marked'

const AddBlog = () => {

    // Axios instance from context
    const { axios } = useAppContext()

    // UI state for submission & AI generation
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    // References for Quill editor
    const editorRef = useRef(null)
    const quillRef = useRef(null)

    // Blog form state
    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('startup')
    const [isPublished, setIsPublished] = useState(false)

    /**
     * Handle blog submission
     * Sends blog data and image as multipart/form-data
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            setIsAdding(true)

            // Construct blog payload
            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished
            }

            // Prepare multipart form data
            const formData = new FormData()
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            // Submit blog to backend
            const { data } = await axios.post('/api/blog/add', formData)

            if (data.success) {
                toast.success(data.message)

                // Reset form after successful submission
                setImage(false)
                setTitle('')
                setSubTitle('')
                setCategory('startup')
                quillRef.current.root.innerHTML = ''
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }
    }

    /**
     * Generate blog content using AI
     * Uses the blog title as the prompt
     */
    const generateContent = async () => {
        if (!title) return toast.error('Title is required')

        try {
            setLoading(true)

            const { data } = await axios.post('/api/blog/generate', {
                prompt: title
            })

            if (data.success) {
                // Insert generated HTML into Quill editor
                quillRef.current.root.innerHTML = parse(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Initialize Quill editor once on mount
     */
    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
        }
    }, [])

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
        >
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

                {/* Image upload */}
                <p>Upload thumbnail</p>
                <label htmlFor="image">
                    <img
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt="upload"
                        className='mt-2 h-16 rounded cursor-pointer'
                    />
                    <input
                        type="file"
                        id="image"
                        hidden
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                {/* Blog title */}
                <p className='mt-4'>Blog title</p>
                <input
                    type="text"
                    placeholder='Type here'
                    value={title}
                    required
                    onChange={e => setTitle(e.target.value)}
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                />

                {/* Blog subtitle */}
                <p className='mt-4'>Sub title</p>
                <input
                    type="text"
                    placeholder='Type here'
                    value={subTitle}
                    required
                    onChange={e => setSubTitle(e.target.value)}
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                />

                {/* Blog description editor */}
                <p className='mt-4'>Blog Description</p>
                <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef}></div>

                    {/* Loading overlay during AI generation */}
                    {loading && (
                        <div className='absolute inset-0 mt-12 flex items-center justify-center bg-black/10'>
                            <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
                        </div>
                    )}

                    {/* AI generation button */}
                    <button
                        type='button'
                        disabled={loading}
                        onClick={generateContent}
                        className='absolute bottom-1 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
                    >
                        Generate with AI
                    </button>
                </div>

                {/* Category selector */}
                <p className='mt-4'>Blog category</p>
                <select
                    name='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                >
                    <option value="">Select category</option>
                    {blogCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Publish toggle */}
                <div className='flex gap-2 mt-4'>
                    <p>Publish Now</p>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={e => setIsPublished(e.target.checked)}
                        className='scale-125 cursor-pointer'
                    />
                </div>

                {/* Submit button */}
                <button
                    type='submit'
                    disabled={isAdding}
                    className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'
                >
                    {isAdding ? 'Adding...' : 'Add Blog'}
                </button>
            </div>
        </form>
    )
}

export default AddBlog