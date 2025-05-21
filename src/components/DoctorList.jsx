import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://backend-z1qz.onrender.com/api/doctors')
      .then(res => {
        setDoctors(res.data.doctors);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctors:', err);
        setLoading(false);
      });
  }, []);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const openProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeProfile = () => {
    setSelectedDoctor(null);
  };

  if (selectedDoctor) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={closeProfile}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Doctors
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex flex-col items-center">
              <img 
                src={selectedDoctor.image} 
                alt={selectedDoctor.name}
                className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h2 className="text-2xl font-bold text-center">{selectedDoctor.name}</h2>
              <p className="text-lg text-gray-700 text-center">
                {selectedDoctor.degree} - {selectedDoctor.speciality}
              </p>
              <p className="text-gray-600 mt-2">{selectedDoctor.experience} Experience</p>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-700">
                  {selectedDoctor.about}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 text-lg">Appointment fee: <span className="text-blue-600">₹{selectedDoctor.fee || '500'}</span></p>
                <button 
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg"
                  onClick={() => navigate('/login')}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  if (loading) return <p className="text-center mt-10">Loading doctors...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="sticky top-0 z-10 bg-white pb-4 pt-4">
              <h1 className="text-2xl font-bold text-gray-800 text-center">Our Specialist Doctors</h1>
              <p className="text-gray-600 text-center">Browse through the doctors specialist.</p>
            </div>
            
            <div className="sticky top-[90px] z-10 bg-white py-8">
              <h2 className="font-semibold text-gray-700 text-center mb-3">Specialties</h2>
              <div className="flex flex-wrap justify-center gap-3">
                { ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialty) => (
                  <p 
                    key={specialty}
                    onClick={() => navigate(`/doctors/${encodeURIComponent(specialty)}`)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg transition-all sticky top-[100px]  cursor-pointer hover:bg-blue-50 hover:border-blue-200"
                  >
                    {specialty}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {doctors.map((doctor, index) => (
                <div 
                  key={index} 
                  onClick={() => openProfile(doctor)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h- object-fill"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Available</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  );
};

export default DoctorList;
