import React from "react";
import "../index.css";
import { assets } from "../assets/assets";
import { doctors, specialityData } from "../assets/assets";

const Contact = () => {
return (
    <section className="contact-section">
        <div className="contact-container">
            <div className="contact-header">
                <h1>We Are Always Ready To Help You.</h1>
                <h2>Book An Appointment</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit prosenet aliquet, prelimmis</p>
            </div>
    
            <div className="contact-content">
                <div className="contact-form">
                    <div className="form-section">
            
                        <form className="contact-form">
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="tel" placeholder="Phone" required />
                            
                            <select required>
                                <option value="">Select Department</option>
                                    {specialityData.map((speciality, index) => (
                                    <option key={index} value={speciality.speciality}>
                                        {speciality.speciality}
                                    </option>
                                ))}
                            </select>
                        
                            <select required>
                                <option value="">Select Doctor</option>
                                {doctors.map(doctor => (
                                    <option key={doctor._id} value={doctor._id}>
                                    {doctor.name} - {doctor.speciality}
                                    </option>
                                ))}
                            </select>
                        
                            <input type="date" required />
                        </form>
                    </div>
        
                    <div className="message-section">
                        <h3>Write Your Message Here...</h3>
                        <textarea rows="5" placeholder="Your message..."></textarea>
                    </div>
        
                    <button className="appointment-button">
                        Book An Appointment
                        <span>(We will confirm by Text Message)</span>
                    </button>
                </div>
    
                <div className="contact-image">
                    <img src={assets.contact_image} alt="Medical appointment" />
                </div>
            </div>
        </div>
    </section>
);
};

export default Contact;