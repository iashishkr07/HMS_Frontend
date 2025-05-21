import React from 'react'
import Header1 from '../components/Header1'
import ServicesInfo from '../components/ServicesInfo'
import ServicesSection from '../components/ServicesSection'
import Testimonials from '../components/Testimonials'
import TopDoctors1 from '../components/TopDoctors1'
import Emergency from './Emergency'
import AboutUs1 from '../components/AboutUs1'
import Navbar from '../components/Navbar'

const Home1 = () => {
    return (
        <div>
            <Navbar />
            <Header1 />
            <ServicesInfo />
            <ServicesSection />
            <TopDoctors1 />
            <AboutUs1 />
            <Emergency />
            <Testimonials />
        </div>
    )
}

export default Home1
