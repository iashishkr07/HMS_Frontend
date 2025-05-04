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

const Home = () => {
    return (
        <div>
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
