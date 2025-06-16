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
      axios
        .get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".navbar")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setMobileMenuOpen(false);
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
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="logo object-cover cursor-pointer w-full h-full"
        />
        <div className="navbar-mobile-buttons">
          {!isLoggedIn && (
            <>
              <Link
                to="/admin-login"
                className="btn btn-outline rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <Link
                to="/login"
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
        {isLoggedIn && (
          <div className="profile-dropdown mobile-profile">
            <div
              className="profile-trigger"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <img
                src={getProfilePic()}
                className="w-11 h-11 rounded-full object-cover"
                alt="Profile"
                onError={(e) => {
                  e.target.src = assets.defaultAvatar;
                }}
              />
              <img
                src={assets.dropdown_icon}
                className="w-3 mt-2"
                alt="dropdown"
              />
            </div>
            {profileDropdownOpen && (
              <div
                className={`profile-dropdown-content ${
                  profileDropdownOpen ? "active" : ""
                }`}
              >
                <Link
                  to="/UserProfile"
                  className="dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/my-appointments"
                  className="dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Appointments
                </Link>
                <Link to="/" onClick={handleLogout} className="dropdown-item">
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
        <div
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          &#9776;
        </div>
      </div>
      <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        {!isLoggedIn ? (
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/loged" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
        )}
        {["doctors", "services", "pages"].map((menu) => (
          <li
            className={`dropdown ${openMenu === menu ? "openMenu" : ""}`}
            key={menu}
          >
            <span onClick={() => toggleMenu(menu)}>
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </span>
            <ul className="dropdown-menu">
              {menu === "doctors" && (
                <>
                  {!isLoggedIn && (
                    <>
                      <li>
                        <Link
                          to="/doctors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Doctor List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/doctors/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Doctor Profile
                        </Link>
                      </li>
                    </>
                  )}
                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/doctors1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Doctor List
                      </Link>
                    </li>
                  )}
                </>
              )}
              {menu === "services" && (
                <li>
                  <Link
                    to="/servicespage"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                </li>
              )}
              {menu === "pages" && (
                <>
                  <li>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/timetable"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Time Table
                    </Link>
                  </li>
                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/bookappointment"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Appointment
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/Testimonials"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Testimonials
                    </Link>
                  </li>
                  {!isLoggedIn && (
                    <>
                      <li>
                        <Link
                          to="/signup"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </li>
        ))}
        <li>
          <Link to="/Contact" onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </Link>
        </li>
        {isLoggedIn && (
          <li className="profile-dropdown desktop-profile">
            <div
              className="profile-trigger"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <img
                src={getProfilePic()}
                className="w-11 h-11 rounded-full object-cover"
                alt="Profile"
                onError={(e) => {
                  e.target.src = assets.defaultAvatar;
                }}
              />
              <img
                src={assets.dropdown_icon}
                className="w-3 mt-2"
                alt="dropdown"
              />
            </div>
            {profileDropdownOpen && (
              <div
                className={`profile-dropdown-content ${
                  profileDropdownOpen ? "active" : ""
                }`}
              >
                <Link
                  to="/UserProfile"
                  className="dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/my-appointments"
                  className="dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Appointments
                </Link>
                <span onClick={handleLogout} className="dropdown-item">
                  Logout
                </span>
              </div>
            )}
          </li>
        )}
      </ul>
      <div className="navbar-right">
        {!isLoggedIn && (
          <>
            <Link
              to="/admin-login"
              className="btn btn-outline rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <Link
              to="/login"
              className="btn btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
