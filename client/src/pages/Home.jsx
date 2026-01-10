
// Shared layout components
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            {/* Top navigation bar */}
            <Navbar />

            {/* Hero / header section */}
            <Header />

            {/* List of published blogs */}
            <BlogList />

            {/* Newsletter subscription section */}
            <Newsletter />

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home
