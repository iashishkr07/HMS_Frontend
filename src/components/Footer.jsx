import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-wrapper">
            <FaHeartbeat className="logo-icon" />
            <h1>ASAP Health</h1>
          </div>
          <p className="tagline">"Dream of Health" — Fast, Compassionate Care</p>
          
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Care</h3>
          <ul>
            <li><a href="/telehealth">24/7 Telehealth</a></li>
            <li><a href="/emergency">Emergency Services</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Wellness Hub</h3>
          <ul>
            {/* <li><a href="/health-blog">Health Blog</a></li> */}
            <li><a href="/preventive-care">Preventive Care</a></li>
            <li><a href="/mental-health">Mental Wellness</a></li>
          </ul>
        </div>

        <div className="footer-column contact-info">
          <h3>Healing Touch</h3>
          <ul>
            <li><FaPhone /> <span>+91 (234) 567-8900</span></li>
            <li><FaEnvelope /> <span>care@aarogyasapna.com</span></li>
            <li><FaMapMarkerAlt /> <span>123 somewhere</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ASAP Health (Aarogya Sapna) — 
          <span> "Dream of Health"</span> | 
          <a href="/privacy"> Privacy Policy</a> | 
          <a href="/terms"> Terms</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
