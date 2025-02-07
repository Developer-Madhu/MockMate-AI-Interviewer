import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'
import Overview from '../Components/Overview/Overview'
import ImageSection from '../Components/ImageSection/ImageSection'
import Footer from '../Components/Footer/Footer'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Overview />
            <ImageSection />
            <Footer />
        </div>
    )
}

export default HomePage