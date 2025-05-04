import React from 'react';
import '../index.css';

const HealthServices = () => {
  const services = [
    { title: "General Treatment", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." },
    { title: "Earth Whitening", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." },
    { title: "Heart Surgery", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." },
    { title: "Ear Treatment", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." },
    { title: "Vision Problems", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." },
    { title: "Blood Transfusion", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet." }
  ];

  return (
    <section className="health-services">
      <div className="container">
        <div className="section-header">
          <h2>We Offer Different Services To Improve Your Health</h2>
          <p>Lorem Ipsum dolor sit amet consectetur adipiscing elit proesent aliquet.</p>
          <span>pretiumtis</span>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="learn-more">Learn More →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthServices;