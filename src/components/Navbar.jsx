
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Testimonials from './Testimonials';
import '../navbar.css';
import { assets } from '../assets/assets';
// import {useAuth} from '../context/AuthContext'

const Navbar = () => {
    const navigate =useNavigate();
   

    const [openMenu, setOpenMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <img onClick={()=>navigate('/')} src={assets.logo} alt="Medit Logo" className="logo object-cover w-full h-full " />
                <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    &#9776;
                </div>
            </div>

            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li>

                {['doctors', 'services', 'pages', 'blogs'].map((menu) => (
                    <li 
                        className={`dropdown ${openMenu === menu ? 'openMenu' : ''}`} 
                        key={menu}
                    >
                        <span onClick={() => toggleMenu(menu)}>
                            {menu.charAt(0).toUpperCase() + menu.slice(1)}
                        </span>
                        <ul className="dropdown-menu">
                            {menu === 'doctors' && (
                                <>
                                    <li><Link to="/doctors/list">Doctor List</Link></li>
                                    <li><Link to="/doctors/profile">Doctor Profile</Link></li>
                                </>
                            )}
                            {menu === 'services' && (
                                <>
                                    <li><Link to="/services/consultation">Consultation</Link></li>
                                    <li><Link to="/services/surgery">Surgery</Link></li>
                                </>
                            )}
                            {menu === 'pages' && (
                                <>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/appointment/docId">Appointment</Link></li>
                                    <li><Link to="/timetable">Time Table</Link></li>
                                    <li><Link to="/Testimonials">Testimonials</Link></li>
                                    <li><Link to="/pricing">Our Pricing</Link></li>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </>
                            )}
                            {menu === 'blogs' && (
                                <>
                                    <li><Link to="/blogs/latest">Latest Blogs</Link></li>
                                    <li><Link to="/blogs/popular">Popular Blogs</Link></li>
                                </>
                            )}
                        </ul>
                    </li>
                ))}

                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
                <Link to="/admin-login" className="btn btn-outline rounded-full">Admin Panel</Link>

            <div className={`navbar-right ${mobileMenuOpen ? 'active' : ''}`}>
                <Link to="/appointment/docId" className="btn btn-primary">Appointment</Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;