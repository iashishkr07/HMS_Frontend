import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';


const LoginForm = () => {
  const [form, setForm] = useState({ Email: '', Password: '' });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // optional
      alert('Login successful');
      navigate('/profile'); // or profile
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-6">Please log in to book appointment</p>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block mb-2 text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="Password"
            value={form.Password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          New here?{' '}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;