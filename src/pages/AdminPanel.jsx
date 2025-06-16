import React, { useState } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaUserPlus,
  FaUserMd,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Dashboard from "./AdminPanel/Dashboard";
import Appointments from "./AdminPanel/Appointments";
import AddDoctor from "./AdminPanel/AddDoctor";
import DoctorsList from "./AdminPanel/DoctorsList";

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Appointments":
        return <Appointments />;
      case "AddDoctor":
        return <AddDoctor />;
      case "DoctorsList":
        return <DoctorsList />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-16 left-4 z-51 p-2 rounded-md bg-white shadow-md"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static top-16 bottom-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-64 bg-white shadow-lg`}
      >
        <div className="h-full p-6 flex flex-col justify-start">
          <div className="space-y-6 text-gray-800">
            <div
              onClick={() => handlePageChange("Dashboard")}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
            >
              <FaHome /> <span>Dashboard</span>
            </div>
            <div
              onClick={() => handlePageChange("Appointments")}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
            >
              <FaCalendarAlt /> <span>Appointments</span>
            </div>
            <div
              onClick={() => handlePageChange("AddDoctor")}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
            >
              <FaUserPlus /> <span>Add Doctor</span>
            </div>
            <div
              onClick={() => handlePageChange("DoctorsList")}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
            >
              <FaUserMd /> <span>Doctors List</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden pointer-events-none"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 w-full">
        <div className="mt-12 lg:mt-0">{renderPage()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
