import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>

                <div className='inline-flex items-center justify-center gap-2 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: AI feature added</p>
                    <img src={assets.star_icon} alt="star" />
                </div>

                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-primary'> blogging</span> <br /> platform.</h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500' >This is your space to think out loud, to share your ideas and stories with the world. Whether you're a seasoned writer or just starting out, this platform is designed to help you express yourself freely and connect with others.</p>

                <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                    <input type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none' />
                    <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' >Search</button>
                </form>
                
            </div>
            <img src={assets.gradientBackground} alt="bg" className='absolute -top-50 -z-1 opacity-50' />
        </div>
    )
}

export default Header