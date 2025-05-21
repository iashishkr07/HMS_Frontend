import React from 'react'
import EmergencyBanner from '../components/EmergencyBanner'
import EmergencyTips from '../components/EmergencyTips'
import RequestAmbulance from '../components/RequestAmbulance'

const Emergency = () => {
  return (
    <div>
        <EmergencyBanner />
        <EmergencyTips />
        <RequestAmbulance />
    </div>
  )
}

export default Emergency