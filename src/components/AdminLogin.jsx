import React, { useState } from 'react';

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState('admin');

  const renderForm = () => {
    
    return (
      <form className="mt-4">
        <label className="block mb-2 text-sm text-gray-600">Email</label>
        <input type="email" className="w-full mb-4 px-4 py-2 border rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <label className="block mb-2 text-sm text-gray-600">Password</label>
        <input type="password" className="w-full mb-6 px-4 py-2 border rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded-lg
          hover:bg-indigo-600 transition">
          {activeTab === 'admin' ? 'Admin Login' : 'Doctor Login'}
        </button>
      </form>
    );
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-around mb-6">
          <button className={`px-4 py-2 rounded-lg font-medium 
          ${ activeTab === 'admin' ? 'bg-indigo-500 text-white':'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('admin')}>
            Admin Login
          </button>
          <button className={`px-4 py-2 rounded-lg font-medium 
          ${ activeTab === 'doctor' ? 'bg-indigo-500 text-white':'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('doctor')}>
            Doctor Login
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          {activeTab === 'admin' ? 'Admin Panel Login' : 'Doctor Panel Login'}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          {activeTab === 'admin'
            ? 'Only admins can access this area.'
            : 'Login to your doctor dashboard.'}
        </p>
        {renderForm()}
      </div>
    </div>
  </>
  );
};
export default AdminLogin;
