import React from 'react'
// import Navbar from '../components/Navbar'
import HeroSection from '../components/Herosection'
import AppointmentSection from '../components/AppointmentSection'
import StatsSection from '../components/StatsSection'
import PropertyList from '../components/PropertyList'

function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <AppointmentSection />
      <StatsSection />
      <PropertyList />
    </>
  )
}

export default Home