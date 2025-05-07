import React from 'react'
import Navbar1 from '../components/Navbar1'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServicesInfo from '../components/ServicesInfo'
import EmergencyBanner from '../components/EmergencyBanner'
import ServicesSection from '../components/ServicesSection'
import TopDoctors from '../components/TopDoctors'
import Testimonials from '../components/Testimonials'

const Profile = () => {
  return (
    <>
      <Navbar1 />
        <div>
        <Header />
        <ServicesInfo />
        <EmergencyBanner />
        <ServicesSection />
        <TopDoctors />
        <Testimonials />            
        </div>
      <Footer />
    </>
  )
}

export default Profile
