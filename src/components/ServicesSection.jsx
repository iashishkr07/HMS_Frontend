import React from "react";
import "../index.css";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  return (
    <section className="speciality-section">
      <div id="speciality" className="speciality-container">
        <div className="speciality-header">
          <h2>Find by Speciality</h2>
          <p className="subtitle">
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <div className="speciality-grid">
          {specialityData.map((item, index) => (
            <Link key={index} to={`/doctors1/${item.speciality}`} className="speciality-card">
              <div className="speciality-icon">
                <img 
                  src={item.image} 
                  alt={item.speciality} 
                  className="speciality-img"
                />
              </div>
              <h3>{item.speciality}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

