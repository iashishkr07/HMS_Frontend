import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const mobileMenuRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setProfileDropdownOpen(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      ref={mobileMenuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              src={assets.logo}
              alt="Logo"
              className="h-20 w-auto cursor-pointer md:h-24 lg:h-28"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoggedIn && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600">
                    <img
                      src={getProfilePic()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = assets.defaultAvatar;
                      }}
                    />
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      profileDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/UserProfile"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-appointments"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        My Appointments
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 md:ml-8">
            <Link
              to={isLoggedIn ? "/1" : "/"}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium"
            >
              Home
            </Link>

            {/* Doctors Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium flex items-center">
                Doctors
                <svg
                  className="ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/doctors"
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                    >
                      Doctor List
                    </Link>
                    <Link
                      to="/doctors/profile"
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                    >
                      Doctor Profile
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/doctors1"
                    className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                  >
                    Doctor List
                  </Link>
                )}
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium flex items-center">
                Services
                <svg
                  className="ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/servicespage"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                >
                  Services
                </Link>
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium flex items-center">
                Pages
                <svg
                  className="ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/about"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                >
                  About
                </Link>
                <Link
                  to="/timetable"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                >
                  Time Table
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/bookappointment"
                    className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                  >
                    Appointment
                  </Link>
                )}
                <Link
                  to="/Testimonials"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                >
                  Testimonials
                </Link>
                {!isLoggedIn && (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop Profile/Login Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/admin-login"
                  className="text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 rounded-full px-6 py-2.5 text-base font-medium transition-colors duration-200"
                >
                  Admin Panel
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600">
                    <img
                      src={getProfilePic()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = assets.defaultAvatar;
                      }}
                    />
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      profileDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/UserProfile"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-appointments"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        My Appointments
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to={isLoggedIn ? "/1" : "/"}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Doctors Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("doctors")}
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex items-center justify-between"
            >
              Doctors
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  openMenu === "doctors" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openMenu === "doctors" && (
              <div className="pl-4 space-y-1">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/doctors"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Doctor List
                    </Link>
                    <Link
                      to="/doctors/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Doctor Profile
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/doctors1"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Doctor List
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("services")}
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex items-center justify-between"
            >
              Services
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  openMenu === "services" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openMenu === "services" && (
              <div className="pl-4 space-y-1">
                <Link
                  to="/servicespage"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Pages Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("pages")}
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex items-center justify-between"
            >
              Pages
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  openMenu === "pages" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openMenu === "pages" && (
              <div className="pl-4 space-y-1">
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/timetable"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Time Table
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/bookappointment"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Appointment
                  </Link>
                )}
                <Link
                  to="/Testimonials"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                {!isLoggedIn && (
                  <>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile Login/Admin Buttons */}
          {!isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
              <Link
                to="/admin-login"
                className="block w-full text-center px-4 py-2 text-base font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Profile Section - Outside of hamburger menu */}
      {isLoggedIn && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-600">
                <img
                  src={getProfilePic()}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = assets.defaultAvatar;
                  }}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {user?.name || "User"}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/UserProfile"
                className="text-sm text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-appointments"
                className="text-sm text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Appointments
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
