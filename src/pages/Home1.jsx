import React from 'react'
import Header from '../components/Header'
import ServicesInfo from '../components/ServicesInfo'
import Testimonials from '../components/Testimonials'
import TopDoctors from '../components/TopDoctors'
import Emergency from './Emergency'
import AboutUs1 from '../components/AboutUs1'
import Navbar from '../components/Navbar'

const Home1 = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <ServicesInfo />
            <TopDoctors />
            <AboutUs1 />
            <Emergency />
            <Testimonials />
        </div>
    )
}

export default Home1
