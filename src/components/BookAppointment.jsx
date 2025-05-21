import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaCalendarAlt,
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import Navbar from "./Navbar";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
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
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:30 PM - 6:30 PM",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://backend-z1qz.onrender.com/api/doctors");
        console.log("Fetched doctors:", response.data);
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
          console.error("API did not return an array:", response.data);
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        setDoctors([]);
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
        alert(result.message);
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
        alert("Failed to book appointment: " + result.message);
      }
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  // Debug logs
  useEffect(() => {
    console.log("Current doctors:", doctors);
  }, [doctors]);

  useEffect(() => {
    console.log("Current form data:", formData);
  }, [formData]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-blue-900">
            Book Appointment at{" "}
            <span className="text-blue-800">AarogyaSapna</span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base lg:text-lg text-blue-700">
            Schedule your visit with our expert healthcare providers
          </p>
        </div>

        <div className="max-w-7xl max-h-[800px] mx-auto grid grid-cols-2 lg:grid-cols-2 sm:gap-6 lg:gap-12">
          <div className="bg-white shadow-md min-w-0 sm:shadow-xl rounded-lg sm:rounded-2xl overflow-hidden order-1 lg:order-none">
            <div className="py-3 sm:py-4 px-4 sm:px-6 bg-blue-700">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Appointment Request
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="block w-full pl-9 
              sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-blue-200 rounded-lg 
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="block w-full 
              pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-blue-200 
              rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="block w-full 
              pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-blue-200 
              rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <select
                name="doctor"
                className="block w-full pl-3 pr-8 sm:pr-10 py-2 sm:py-3 text-sm 
            sm:text-base border border-blue-200 rounded-lg shadow-sm focus:outline-none
            focus:ring-blue-500 focus:border-blue-500"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {Array.isArray(doctors) &&
                  doctors.map((doc) => (
                    <option key={doc._id} value={doc.name}>
                      {doc.name} - {doc.speciality}
                    </option>
                  ))}
              </select>

              <select
                name="timeslot"
                className="block w-full pl-3 pr-8 sm:pr-10 py-2 sm:py-3 text-sm 
            sm:text-base border border-blue-200 rounded-lg shadow-sm focus:outline-none 
            focus:ring-blue-500 focus:border-blue-500"
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

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                </div>
                <input
                  type="date"
                  name="date"
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 
              sm:py-3 text-sm sm:text-base border border-blue-200 rounded-lg shadow-sm 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Your message (optional)"
                rows="3"
                className="block w-full px-3 py-2 text-sm sm:text-base border border-blue-200 
              rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium 
              sm:font-bold py-2 sm:py-3 px-4 rounded-lg shadow-md transition duration-300 text-sm 
              sm:text-base"
              >
                Book Appointment
              </button>
            </form>
          </div>

          <div
            className="relative bg-white shadow-md sm:shadow-xl rounded-lg sm:rounded-2xl 
        overflow-hidden order-2 lg:order-none h-full flex flex-col"
          >
            <div className="py-3 sm:py-4 px-4 sm:px-6 bg-blue-700">
              <h2 className="text-lg sm:text-xl font-bold text-white text-center">
                Meet Our Specialists
              </h2>
            </div>

            <div className="flex-grow flex items-center p-2 sm:p-4">
              <Carousel
                selectedItem={currentSlide}
                onChange={setCurrentSlide}
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                stopOnHover={true}
                className="w-full"
                emulateTouch={true}
                swipeable={true}
              >
                {Array.isArray(doctors) &&
                  doctors.map((doctor) => (
                    <div key={doctor._id} className="px-4 sm:px-6 py-4 sm:py-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4 sm:mb-6">
                          <div className="absolute -inset-3 sm:-inset-4 bg-blue-100 rounded-full opacity-30 transform rotate-6"></div>
                          <div className="absolute -inset-1 sm:-inset-2 bg-blue-200 rounded-full opacity-30 transform -rotate-3"></div>
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover 
                        rounded-full border-4 border-white shadow-lg sm:shadow-xl z-10 mx-auto"
                          />
                          <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 sm:px-4 py-1 rounded-full shadow-sm sm:shadow-md border border-blue-200 z-20">
                            <span className="text-xs sm:text-sm font-semibold text-blue-700">
                              {doctor.experience}
                            </span>
                          </div>
                        </div>

                        <div className="w-full">
                          <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
                            {doctor.name}
                          </h3>
                          <p className="text-base sm:text-lg text-blue-700 mb-1 sm:mb-2">
                            {doctor.speciality}
                          </p>

                          <div className="flex items-center justify-center mb-2 sm:mb-3">
                            <FaCalendarAlt className="text-blue-500 mr-1 sm:mr-2 text-sm sm:text-base" />
                            <span className="text-xs sm:text-sm font-medium text-blue-700">
                              Available: 10 AM – 4 PM
                            </span>
                          </div>

                          <div className="flex justify-center mb-3 sm:mb-4">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-lg sm:text-xl ${
                                  i < 4 ? "text-yellow-400" : "text-blue-200"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 mx-auto max-w-xs sm:max-w-md">
                            <h4 className="text-base sm:text-lg font-semibold text-blue-800 mb-1 sm:mb-2">
                              Patient Reviews
                            </h4>
                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex items-start justify-center">
                                <FaQuoteLeft className="text-blue-200 mr-1 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0 text-xs sm:text-sm" />
                                <p className="text-blue-700 italic text-xs sm:text-sm">
                                  "Dr. {doctor.name.split(" ")[1]} is very
                                  professional and kind."
                                </p>
                              </div>
                              <div className="flex items-start justify-center">
                                <FaQuoteLeft className="text-blue-200 mr-1 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0 text-xs sm:text-sm" />
                                <p className="text-blue-700 italic text-xs sm:text-sm">
                                  "Best {doctor.speciality.toLowerCase()} I've
                                  met!"
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              setFormData({ ...formData, doctor: doctor.name })
                            }
                            className="mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-1 sm:py-2 px-4 sm:px-6 rounded-full shadow-sm sm:shadow-md hover:shadow-lg transition-all mx-auto block text-xs sm:text-sm"
                          >
                            Book with Dr. {doctor.name.split(" ")[1]}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>

            <div className="flex justify-center pb-4 sm:pb-6 pt-1 sm:pt-2">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`mx-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-blue-600 w-4 sm:w-6"
                      : "bg-blue-200"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
