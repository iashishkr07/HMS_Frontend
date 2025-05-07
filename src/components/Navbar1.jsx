import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar1 = () => {
const navigate = useNavigate();
const [openMenu, setOpenMenu] = useState(null);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
const profileRef = useRef();

const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
};

useEffect(() => {
    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileDropdownOpen(false);
        }
        };
    document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

return (
    <nav className="navbar ">
        <div className="navbar-header ">
            <img onClick={() => navigate('/')} src={assets.logo}  className="logo h-full w-auto cursor-pointer object-cover"/>
            <div className="hamburger " onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
                &#9776;
            </div>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>        
                {['doctors', 'services', 'pages', 'blogs'].map((menu) => (
                    <li className={`dropdown ${openMenu === menu ? 'openMenu' : ''}`}  key={menu} >
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
                                {/* <li><Link to="/signup">Sign Up</Link></li> */}
                                {/* <li><Link to="/login">Login</Link></li> */}
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
        

        <div className="navbar-right flex items-center mt-4 md:mt-0 space-x-4">
        <Link to="/admin-login" className="btn btn-outline rounded-full mr-48 hover:bg-blue-50 transition" >
            Admin Panel
        </Link>

        <div className="relative cursor-pointer flex gap-2" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} ref={profileRef} >
            <img src={assets.profile_pic} className="w-11 h-11 rounded-full object-cover" alt="Profile" />
            <img src={assets.dropdown_icon} className='w-3 mt-2 ' />
            {profileDropdownOpen && (
            <div className="absolute right-0 mt-[4.5rem] w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link to="/my-profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <Link to="/my-appointments" className="block px-4 py-2 hover:bg-gray-100">My Appointments</Link>
                    {/* <a
                    href="https://github.com/your-repo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                    >
                    Source Code
                    </a> */}
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
            )}
        </div>
    </div>
</nav>
);
};

export default Navbar1;
