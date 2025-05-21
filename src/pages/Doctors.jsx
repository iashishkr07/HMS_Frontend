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
        const response = await axios.get("https://backend-z1qz.onrender.com/api/doctors");
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
        <div className="sticky top-0 z-10 bg-white pb-4 pt-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Our Specialist Doctors
          </h1>
          <p className="text-gray-600 text-center">
            Browse through the doctors specialist.
          </p>
        </div>

        {/* Sticky specialties */}
        <div className="sticky top-[90px] z-10 bg-white py-8">
          <h2 className="font-semibold text-gray-700 text-center mb-3">
            Specialties
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty) => (
              <p
                key={specialty}
                onClick={() =>
                  navigate(`/doctors/${encodeURIComponent(specialty)}`)
                }
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg transition-all sticky top-[100px]  cursor-pointer hover:bg-blue-50 hover:border-blue-200"
              >
                {specialty}
              </p>
            ))}
          </div>
          <div className="w-[70%] grid grid-cols-4 gap-4 gap-y-6 my-8 mx-72">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
              >
                <img className="object-fill h-48" src={item.image} />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
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
