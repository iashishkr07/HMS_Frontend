import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUserPlus, FaUserMd } from 'react-icons/fa';
import Dashboard from './AdminPanel/Dashboard';
import Appointments from './AdminPanel/Appointments';
import AddDoctor from './AdminPanel/AddDoctor';
import DoctorsList from './AdminPanel/DoctorsList'

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Appointments':
        return <Appointments />;
      case 'AddDoctor':
        return <AddDoctor />;
      case 'DoctorsList':
        return <DoctorsList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow p-6">
        <div className="space-y-6 text-gray-800">
          <div onClick={() => setActivePage('Dashboard')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaHome /> <span>Dashboard</span>
          </div>
          <div onClick={() => setActivePage('Appointments')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaCalendarAlt /> <span>Appointments</span>
          </div>
          <div onClick={() => setActivePage('AddDoctor')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaUserPlus /> <span>Add Doctor</span>
          </div>
          <div onClick={() => setActivePage('DoctorsList')} className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaUserMd /> <span>Doctors List</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPanel;
