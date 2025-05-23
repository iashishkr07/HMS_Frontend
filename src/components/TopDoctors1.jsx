import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopDoctors1 = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://backend-z1qz.onrender.com/api/doctors"
        );
        console.log("Fetched doctors:", response.data);

        // Use response.data directly, since it's already an array
        const doctorsArray = Array.isArray(response.data) ? response.data : [];
        setDoctors(doctorsArray);

        // Extract unique specialties
        const specialties = [
          ...new Set(doctorsArray.map((doc) => doc.speciality)),
        ];
        setUniqueSpecialties(specialties);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        setDoctors([]);
        setUniqueSpecialties([]);
      }
    };

    fetchDoctors();
  }, []);

  // const {doctors} =useContext(AppContext)
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-[80%] grid grid-cols-4 gap-4 pt-5 gap-y-6 px-3  sm:px-0">
        {Array.isArray(doctors) &&
          doctors.slice(0, 8).map((item, index) => (
            <div className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500">
              <img className=" object-contain h-48  " src={item.image} />
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
        onClick={() => {
          navigate("/doctors1");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 mt-10 rounded-full"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors1;
