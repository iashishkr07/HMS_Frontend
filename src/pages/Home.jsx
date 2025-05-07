import React from 'react'
import Header from '../components/Header'
import ServicesInfo from '../components/ServicesInfo'
import ServicesSection from '../components/ServicesSection'
// import EmergencyBanner from '..components/EmergencyBanner'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import EmergencyBanner from '../components/EmergencyBanner'
import TopDoctors from '../components/TopDoctors'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <ServicesInfo />
            <EmergencyBanner />
            <ServicesSection />
            <TopDoctors />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
