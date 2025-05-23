import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../api';
import Navbar from './Navbar';
import 'animate.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Phone: '',
    Gender: '',
    Dob: '',
    Address: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData({
          FullName: res.data.user.FullName || '',
          Email: res.data.user.Email || '',
          Phone: res.data.user.Phone || '',
          Gender: res.data.user.Gender || '',
          Dob: res.data.user.Dob?.substr(0, 10) || '',
          Address: res.data.user.Address || '', // Now treated as plain string
        });
      } catch (err) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
      if (profilePic) form.append('profilePic', profilePic);

      const res = await axios.put('/user/me', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(res.data.user);
      toast.success('Profile updated successfully');
      setEditMode(false);
      setProfilePic(null);
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-4">Loading profile...</div>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 via-white to-blue-50 animate__animated animate__fadeIn">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4 group">
            <label className="cursor-pointer w-full h-full block relative">
              <img
                src={profilePic ? URL.createObjectURL(profilePic) : user.profilePic}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-lg border border-gray-300 group-hover:opacity-80 transition"
              />
              {editMode && (
                <>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <FaEdit className="text-white text-xl" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                </>
              )}
            </label>
          </div>

          {!editMode ? (
            <>
              <h2 className="text-2xl font-semibold">{user.FullName}</h2>
              <p className="text-gray-600">{user.Email}</p>
              <div className="mt-6 space-y-2 text-gray-700 text-left w-full">
                <p><strong>Phone:</strong> {user.Phone}</p>
                <p><strong>Gender:</strong> {user.Gender}</p>
                <p><strong>DOB:</strong> {user.Dob?.substr(0, 10)}</p>
                <p><strong>Address:</strong> {user.Address}</p>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
                >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="w-full mt-2 space-y-4 text-left">
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded"
                />
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                />
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
                />
              <input
                type="date"
                name="Dob"
                value={formData.Dob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90 transition-all"
                  >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                  >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
