import React from 'react';
import '../index.css';

const EmergencyBanner = () => {
  return (
    <section className="emergency-banner">
      <div className="container">
        <h2>Do you need Emergency Medical Care? Call @ +91 (234)567-8900</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor dictum turpis nec gravida.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Contact Now</button>
          <button className="btn-outline">Learn More →</button>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;