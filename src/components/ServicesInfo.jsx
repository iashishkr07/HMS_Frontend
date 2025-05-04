import React from 'react';
import '../index.css'; // Create this CSS file

const ServicesInfo = () => {
  const services = [
    {
      title: "Lorem Amet",
      subtitle: "Emergency Cases",
      description: "Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.",
      linkText: "LEARN MORE →",
      link: "/"
    },
    {
      title: "Fusce Porttitor",
      subtitle: "Doctors Timetable",
      description: "Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.",
      linkText: "LEARN MORE →",
      link: "/"
    },
    {
      title: "Donec luctus",
      subtitle: "Opening Hours",
      description: "",
      hours: [
        { days: "Monday - Friday", time: "8.00-20.00" },
        { days: "Saturday", time: "9.00-18.30" },
        { days: "Sunday - Thursday", time: "9.00-15.00" }
      ],
      linkText: "LEARN MORE →",
      link: "/"
    }
  ];

  return (
    <div className="services-info-container">
      {services.map((service, index) => (
        <div className="service-card" key={index}>
          <h3>{service.title}</h3>
          <h4>{service.subtitle}</h4>
          {service.description && <p>{service.description}</p>}
          
          {service.hours && (
            <div className="opening-hours">
              {service.hours.map((hour, i) => (
                <div className="hour-row" key={i}>
                  <span className="days">{hour.days}</span>
                  <span className="time">{hour.time}</span>
                </div>
              ))}
            </div>
          )}
          
          <a href={service.link} className="learn-more">{service.linkText}</a>
        </div>
      ))}
    </div>
  );
};

export default ServicesInfo;