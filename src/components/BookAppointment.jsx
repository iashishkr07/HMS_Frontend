import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaArrowRight,
  FaCheckCircle,
  FaStethoscope,
} from "react-icons/fa";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    timeslot: "",
    date: "",
    message: "",
  });

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://backend-z1qz.onrender.com/api/doctors"
        );
        if (Array.isArray(response.data)) {
          // Get one doctor from each department
          const departments = {};
          response.data.forEach((doctor) => {
            if (!departments[doctor.speciality]) {
              departments[doctor.speciality] = doctor;
            }
          });
          setDoctors(Object.values(departments));
        }
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        toast.error("Failed to load doctors. Please try again later.");
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-z1qz.onrender.com/api/book-appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          doctor: "",
          timeslot: "",
          date: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Failed to book appointment");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen bg-gray-50 py-2 sm:py-4">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">
                    Book Your Medical Appointment
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-100">
                    Connect with our expert doctors
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    className="w-full px-4 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="p-2 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                {/* Doctors Section */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                      Available Doctors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2">
                      {filteredDoctors.map((doctor) => (
                        <div
                          key={doctor._id}
                          className={`p-2 rounded-lg border cursor-pointer transition-all duration-300 ${
                            selectedDoctor?._id === doctor._id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setFormData((prev) => ({
                              ...prev,
                              doctor: doctor.name,
                            }));
                          }}
                        >
                          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-800 truncate">
                                {doctor.name}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {doctor.speciality}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <FaClock className="mr-1" />
                                <span>{doctor.experience}</span>
                              </div>
                              <p className="text-sm font-semibold text-blue-600 mt-1">
                                ₹{doctor.fees}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Appointment Form */}
                <div className="lg:col-span-7">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-2 sm:space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="date"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="timeslot"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.timeslot}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      name="message"
                      placeholder="Additional Notes (Optional)"
                      rows="2"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>Book Appointment</span>
                        <FaArrowRight />
                      </button>
                      <div className="flex items-center justify-center sm:justify-end space-x-2 text-green-600 text-xs sm:text-sm">
                        <FaCheckCircle />
                        <span>Secure & Confidential</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
