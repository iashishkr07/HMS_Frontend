import React from 'react';
import '../index.css';

const ServicesInfo = () => {
  const services = [
    {
      title: "24/7 Emergency Care",
      subtitle: "Emergency Cases",
      description:
        "Our emergency department is open 24/7, providing immediate medical attention for critical cases including trauma, cardiac arrest, and acute illness.",
      linkText: "LEARN MORE →",
      link: "/emergency",
    },
    {
      title: "Consultation Scheduling",
      subtitle: "Doctors Timetable",
      description:
        "Check our specialists’ availability and book appointments easily. We ensure timely consultation with top physicians across various departments.",
      linkText: "LEARN MORE →",
      link: "/timetable",
    },
    {
      title: "What Our Patients Say",
      subtitle: "Patient Testimonials",
      description:
        `"The care and attention I received at AarogyaSapna was exceptional. From emergency care to follow-up visits, the team was professional and compassionate." — Priya S., New Delhi`,
      linkText: "READ MORE REVIEWS →",
      link: "/testimonials",
    },
  ];

  return (
    <div className='bg-gradient-to-r from-white to-blue-50'>
    <section className="services-info-wrapper">
      <div className="services-grid">
        {services.map((service, index) => (
          <article className="service-card enhanced-card" key={index}>
            <header className="service-header">
              <h3 className="service-title">{service.title}</h3>
              <h4 className="service-subtitle">{service.subtitle}</h4>
            </header>

            {service.description && (
              <p className="service-description">{service.description}</p>
            )}

            <a href={service.link} className="service-link">
              {service.linkText}
            </a>
          </article>
        ))}
      </div>
    </section>
  </div>
  );
};

export default ServicesInfo;
