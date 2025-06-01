import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import "../navbar.css";
import axios from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const profileRef = useRef();

  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios.get("/user/me", {headers: { Authorization: `Bearer ${token}` }, })
        .then((res) => {
          setUser(res.data.user);
          if (res.data.user && !res.data.user.profilePic) {
            setUser((prev) => ({ ...prev, profilePic: assets.defaultAvatar }));
          }
        })
        .catch((err) => {
          console.error("User fetch failed", err);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const getProfilePic = () => {
    if (!user) return assets.defaultAvatar;
    if (user.profilePic) {
      if (user.profilePic.startsWith("http")) {
        return user.profilePic;
      }
      return `${axios.defaults.baseURL}${user.profilePic}`;
    }
    return assets.defaultAvatar;
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img onClick={() => navigate("/")} src={assets.logo} alt="Logo" className="logo object-cover cursor-pointer w-full h-full" />
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        {!isLoggedIn ? (
          <li> <Link to="/">Home</Link> </li>
        ) : (
          <li> <Link to="/1">Home</Link> </li>
        )}

        {["doctors", "services", "pages"].map((menu) => (
          <li className={`dropdown ${openMenu === menu ? "openMenu" : ""}`} key={menu} >
            <span onClick={() => toggleMenu(menu)}>
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </span>
            <ul className="dropdown-menu">
              {menu === "doctors" && (
                <>
                  {!isLoggedIn && (
                    <>
                      <li> <Link to="/doctors">Doctor List</Link> </li>
                      <li> <Link to="/doctors/profile">Doctor Profile</Link> </li>
                    </>
                  )}
                  {isLoggedIn && (
                    <li> <Link to="/doctors1">Doctor List</Link> </li>
                  )}
                </>
              )}
              {menu === "services" && (
                <>
                  <li> <Link to="/servicespage">Services</Link> </li>
                </>
              )}
              {menu === "pages" && (
                <>
                  <li> <Link to="/about">About</Link> </li>
                  <li> <Link to="/timetable">Time Table</Link> </li>
                  {isLoggedIn && (
                    <li> <Link to="/bookappointment">Appointment</Link> </li>
                  )}
                  <li> <Link to="/Testimonials">Testimonials</Link> </li>
                  {!isLoggedIn && (
                    <>
                      <li> <Link to="/signup">Sign Up</Link> </li>
                      <li> <Link to="/login">Login</Link> </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </li>
        ))}
        <li> <Link to="/contact">Contact Us</Link> </li>
      </ul>

      <div className="navbar-right flex items-center space-x-4 mx-8 mt-4 md:mt-0">
        {!isLoggedIn ? (
          <>
            <Link to="/admin-login" className="btn btn-outline rounded-full"> Admin Panel </Link>
            <Link to="/login" className="btn btn-primary"> Login </Link>
          </>
        ) : (
          <div className="relative cursor-pointer flex items-center gap-2"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} ref={profileRef} >
            <img src={getProfilePic()} className="w-11 h-11 rounded-full object-cover" alt="Profile" onError={(e) => {
                e.target.src = assets.defaultAvatar;}}/>
            <img src={assets.dropdown_icon} className="w-3 mt-2" alt="dropdown" />

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-[4.5rem] w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link to="/UserProfile" className="block px-4 py-2 hover:bg-gray-100" > My Profile </Link>
                <Link to="/my-appointments" className="block px-4 py-2 hover:bg-gray-100" >
                  My Appointments
                </Link>
                <span onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" > Logout
                </span>
              </div>
            )}
          </div>
        )}
        <div className="hamburger ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
          &#9776;
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

