import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-xl font-bold border-b">AarogyaSapna</div>
        <nav className="p-4 space-y-4">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
          <Link to="/appointments" className="block text-gray-700 hover:text-blue-600">Appointments</Link>
          <Link to="/logout" className="block text-red-600 hover:underline">Logout</Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
