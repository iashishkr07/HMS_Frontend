import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUserPlus, FaUserMd } from 'react-icons/fa';
import Dashboard from './Dashboard';
import Appointments from './Appointments';

const DoctorPanel = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Appointments':
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-6">
        <div className="space-y-6 text-gray-800">
          <div onClick={() => setActivePage('Dashboard')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaHome /> <span>Dashboard</span>
          </div>
          <div onClick={() => setActivePage('Appointments')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaCalendarAlt /> <span>Appointments</span>
          </div>
          
        </div>
      </div>

      <div className="flex-1 p-6">
        {renderPage()}
      </div>
    </div>
  );
};

export default DoctorPanel;
