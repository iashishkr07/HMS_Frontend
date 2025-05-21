import React from 'react'
import Header from '../components/Header'
import ServicesInfo from '../components/ServicesInfo'
import Testimonials from '../components/Testimonials'
import TopDoctors from '../components/TopDoctors'
import ContactUs from '../components/ContactUS'
import Emergency from './Emergency'
import Services from '../components/Services'
import AboutUs1 from '../components/AboutUs1'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <ServicesInfo />/
            <TopDoctors />
            <Services />
            <AboutUs1/>
            <Emergency />
            <Testimonials />
            <ContactUs />
        </div>
    )
}

export default Home
