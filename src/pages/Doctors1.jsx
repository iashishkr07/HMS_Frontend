import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Doctors1 = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

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
      }
    };

    fetchDoctors();
  }, []);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center sm:text-left sm:ml-20 mt-4 text-sm sm:text-base">
          Browse through the doctors specialist.
        </p>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 sm:gap-5 mt-3 sm:mt-5">
          <div className="w-full lg:w-auto flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
            {specialties.map((specialty, idx) => (
              <p
                key={idx}
                onClick={() =>
                  navigate(`/doctors1/${encodeURIComponent(specialty)}`)
                }
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-800 rounded transition-all cursor-pointer hover:bg-gray-100 text-center lg:text-left whitespace-nowrap"
              >
                {specialty}
              </p>
            ))}
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mt-4 lg:mt-0">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative w-full aspect-[1/1] sm:aspect-[3/2]">
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="p-2 sm:p-4 flex-grow">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-center text-green-500">
                    <p className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-sm sm:text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Doctors1;
