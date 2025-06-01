import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const TopDoctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const handleNavigation = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/doctors1");
    } else {
      navigate("/doctors");
    }
    scrollTo(0, 0);
  };

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

  return (
    <div className="flex flex-col items-center gap-4 my-8 md:my-16 text-gray-900 px-4 md:mx-10">
      <h1 className="text-2xl md:text-3xl font-medium text-center">
        Top Doctors to Book
      </h1>
      <p className="w-full md:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 gap-y-6">
        {Array.isArray(doctors) &&
          doctors.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
            >
              <img
                className="w-full object-contain h-48"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handleNavigation}
        className="bg-blue-50 text-gray-600 px-8 md:px-12 py-2 md:py-3 mt-6 md:mt-10 rounded-full text-sm md:text-base"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
