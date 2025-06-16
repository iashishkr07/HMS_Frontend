import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Doctors1 = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique specialties from doctors data
  const specialties = [...new Set(doctors.map((doc) => doc.speciality))];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://backend-z1qz.onrender.com/api/doctors"
        );
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter((doctor) => doctor.speciality === speciality);
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(lowerCaseQuery) ||
          doctor.speciality.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]);

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="w-full max-w-7xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filterDoc.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <div className="aspect-w-3 aspect-h-4">
                        <img
                          className="object-cover w-full h-full transition-all duration-300"
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x400?text=Doctor+Image";
                          }}
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
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.speciality}
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
        </div>
      </div>
    </>
  );
};

export default Doctors1;
