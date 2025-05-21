import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Doctors1 = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://backend-z1qz.onrender.com/api/doctors");
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data.data);
        // Extract unique specialties
        const specialties = [
          ...new Set(response.data.data.map((doc) => doc.speciality)),
        ];
        setUniqueSpecialties(specialties);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
      }
    };

    fetchDoctors();
  }, []);

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (Array.isArray(doctors)) {
      if (speciality) {
        setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
      } else {
        setFilterDoc(doctors);
      }
    } else {
      setFilterDoc([]); 
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <>
      <Navbar />
      <div>
        <p className="text-gray-600 ml-20">
          Browse through the doctors specialist.
        </p>
        <div className="flex flex-col ml-16 sm:flex-row items-start gap-5 mt-5">
          <div className="flex-col gap-4  text-sm text-gray-600">
            {uniqueSpecialties.map((specialty, index) => (
              <p
                key={index}
                onClick={() =>
                  navigate(`/doctors1/${encodeURIComponent(specialty)}`)
                }
                className="w-[94vw] sm:w-auto px-8 py-1.5 m-2 border border-gray-800 rounded transition-all cursor-pointer"
              >
                {specialty}
              </p>
            ))}
          </div>
          <div className="w-[80%] grid grid-cols-auto gap-4 gap-y-6  mr-auto">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
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

export default Doctors1;
