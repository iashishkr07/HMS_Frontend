
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const SignUpForm = () => {
  const [form, setForm] = useState({ 
    FullName: '', 
    Email: '', 
    Phone: '', 
    Password: '', 
    ConfirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.FullName.trim()) newErrors.FullName = 'Full name is required';
    if (form.FullName.length > 50) newErrors.FullName = 'Name is too long';
    
    if (!form.Email.trim()) newErrors.Email = 'Email is required';
    else if (!emailRegex.test(form.Email)) newErrors.Email = 'Invalid email format';

    if (!form.Password) newErrors.Password = 'Password is required';
    else if (form.Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';
    else if (form.Password.length > 50) newErrors.Password = 'Password is too long';

    if (form.Password !== form.ConfirmPassword) newErrors.ConfirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting:', {
        FullName: form.FullName,
        Email: form.Email,
        Phone: form.Phone || '',
        Password: form.Password
      });

      const res = await API.post('/signup', {
        FullName: form.FullName,
        Email: form.Email,
        Phone: form.Phone || '',
        Password: form.Password
      });
      
      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message;
      if (message?.toLowerCase().includes('email')) {
        setErrors({ ...errors, Email: message });
      } else if (message?.toLowerCase().includes('password')) {
        setErrors({ ...errors, Password: message });
      } else {
        setErrors({ ...errors, form: message || 'Signup failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">Please sign up to book appointment</p>

        {errors.form && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-1 text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={form.FullName}
            onChange={handleChange}
            disabled={loading}
            className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? 'bg-gray-100' : ''
            }`}
          />
          {errors.FullName && <p className="text-sm text-red-600 mb-2">{errors.FullName}</p>}

          <label className="block mb-1 text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            disabled={loading}
            className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? 'bg-gray-100' : ''
            }`}
          />
          {errors.Email && <p className="text-sm text-red-600 mb-2">{errors.Email}</p>}

          <label className="block mb-1 text-sm text-gray-600">Phone </label>
          <input
            type="tel"
            name="Phone"
            value={form.Phone}
            onChange={handleChange}
            disabled={loading}
            className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? 'bg-gray-100' : ''
            }`}
          />

          <label className="block mb-1 text-sm text-gray-600">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              value={form.Password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loading ? 'bg-gray-100' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-500"
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.Password && <p className="text-sm text-red-600 mb-2">{errors.Password}</p>}

          <label className="block mb-1 text-sm text-gray-600">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="ConfirmPassword"
              value={form.ConfirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loading ? 'bg-gray-100' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-sm text-gray-500"
              disabled={loading}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.ConfirmPassword && (
            <p className="text-sm text-red-600 mb-4">{errors.ConfirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;