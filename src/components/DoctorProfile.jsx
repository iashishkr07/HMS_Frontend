import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DoctorProfile = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://backend-z1qz.onrender.com/api/doctors"
        );
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.speciality.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const openProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeProfile = () => {
    setSelectedDoctor(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-700 text-lg font-medium">
              Loading doctors...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (selectedDoctor) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <button
              onClick={closeProfile}
              className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Doctors
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-8 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-purple-50">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                  />
                  <h2 className="text-2xl font-bold text-gray-900 text-center">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-lg text-gray-700 text-center mt-2">
                    {selectedDoctor.degree} - {selectedDoctor.speciality}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {selectedDoctor.experience} Experience
                  </p>
                </div>

                <div className="md:w-2/3 p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedDoctor.about}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <p className="font-semibold text-gray-900 text-lg mb-4">
                      Appointment fee:{" "}
                      <span className="text-indigo-600">
                        ₹{selectedDoctor.fees || "500"}
                      </span>
                    </p>
                    <button
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
                      onClick={() => navigate("/login")}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="sticky top-0 z-10 bg-transparent pb-4 pt-4">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Our Specialist Doctors
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Browse through our team of expert doctors
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => openProfile(doctor)}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      Available
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.speciality}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        4.8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
