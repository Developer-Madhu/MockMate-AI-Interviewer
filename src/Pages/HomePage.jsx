import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'
import Overview from '../Components/Overview/Overview'
import ImageSection from '../Components/ImageSection/ImageSection'
import Footer from '../Components/Footer/Footer'
import Pricing from '../Components/Pricing'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <br />
            <Hero />
            <Overview />
            <ImageSection />
            <Pricing />
            <Footer />
        </div>
    )
}

export default HomePage