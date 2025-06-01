import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://backend-z1qz.onrender.com/api/doctors"
        );
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data);
        const uniqueSpecialties = [
          ...new Set(response.data.map((doctor) => doctor.speciality)),
        ];
        setSpecialties(uniqueSpecialties);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
      }
    };

    fetchDoctors();
  }, []);

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doctors) => doctors.speciality === speciality)
      );
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
      <div className="bg-gradient-to-r from-gray-50 to-white">
        <div className="sticky top-0 z-10 bg-white pb-4 pt-4 px-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Our Specialist Doctors
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center">
            Browse through the doctors specialist.
          </p>
        </div>

        <div className="sticky top-[90px] z-10 bg-white py-4 md:py-8">
          <h2 className="font-semibold text-gray-700 text-center mb-3 text-sm md:text-base">
            Specialties
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2 md:px-4">
            {specialties.map((specialty) => (
              <p
                key={specialty}
                onClick={() =>
                  navigate(`/doctors/${encodeURIComponent(specialty)}`)
                }
                className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base text-gray-600 border border-gray-300 rounded-lg transition-all sticky top-[100px] cursor-pointer hover:bg-blue-50 hover:border-blue-200"
              >
                {specialty}
              </p>
            ))}
          </div>
          <div className="w-full md:w-[95%] lg:w-[90%] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-4 my-4 md:my-8 mx-auto px-2 md:px-8 lg:px-4 xl:px-4">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
              >
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px]">
                  <img
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="p-2 sm:p-4 md:p-5 lg:p-6">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-center text-green-500">
                    <p className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium mt-1 sm:mt-2">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mt-0.5 sm:mt-1">
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

export default Doctors;
