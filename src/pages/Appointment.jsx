import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import API from "../api"; // Axios config with base URL + auth token
import Navbar from "../components/Navbar";

const Appointment = () => {
  const { docId } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [docInfo, setDocInfo] = useState(undefined);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
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

  const generateAvailableDates = () => {
    const dates = [];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        day: days[date.getDay()],
        date: date.getDate(),
        fullDate: date,
        month: date.toLocaleString("default", { month: "short" }),
      });
    }
    return dates;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserInfo({
        name: storedUser.FullName || "",
        email: storedUser.Email || "",
        phone: storedUser.Phone || "",
        message: "",
      });
    }
  }, []);

  useEffect(() => {
    setAvailableDates(generateAvailableDates());
  }, []);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.get("/doctors");
        const allDoctors = response.data.data;
        setDoctors(allDoctors);

        const selected = allDoctors.find((d) => d._id === docId);
        setDocInfo(selected || null);

        if (selected) {
          const related = allDoctors
            .filter(
              (doc) =>
                doc.speciality === selected.speciality &&
                doc._id !== selected._id
            )
            .slice(0, 4);
          setRelatedDoctors(related);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
      }
    };

    fetchDoctors();
  }, [docId]);

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login to book an appointment");
        return;
      }

      await API.post("/book-appointment", {
        userId: user._id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        doctorId: docInfo._id,
        doctorName: docInfo.name,
        date: `${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}`,
        time: selectedTime,
        message: userInfo.message,
      });

      alert("Appointment booked successfully!");
      setSelectedTime(null);
      setUserInfo((prev) => ({ ...prev, message: "" }));
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again later.");
    }
  };

  if (docInfo === undefined) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading doctor information...
      </div>
    );
  }

  if (docInfo === null) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Doctor not found. Please check the link or go back to{" "}
        <a href="/doctors" className="underline text-blue-600">
          Doctors
        </a>
        .
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="w-full md:w-1/3">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-auto rounded-lg shadow-md border-4 border-blue-100"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-blue-800">
                {docInfo.name}
              </h1>
              <img
                src={assets.verified_icon}
                className="w-5 h-5"
                alt="Verified"
              />
            </div>

            <div className="flex items-center gap-3">
              <p className="text-blue-700">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {docInfo.experience} Experience
              </span>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 text-lg font-medium text-blue-800 mb-2">
                About{" "}
                <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
              </div>
              <p className="text-blue-900">{docInfo.about}</p>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-white">
              <p className="font-semibold text-blue-800">
                Appointment fee:{" "}
                <span className="text-blue-600 font-bold">₹500</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Booking slots
          </h2>

          <div className="flex gap-4 overflow-x-auto py-2 mb-6">
            {availableDates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center 
              min-w-16 p-3 rounded-lg border ${
                selectedDate?.date === date.date
                  ? "border-blue-500 bg-blue-100 text-blue-800"
                  : "border-blue-200 hover:border-blue-300 text-blue-700"
              }`}
              >
                <span className="font-medium">{date.day}</span>
                <span className="text-lg font-bold">{date.date}</span>
                <span className="text-xs text-blue-600">{date.month}</span>
                {index === 0 && (
                  <span className="text-xs text-blue-600 mt-1 font-medium">
                    Today
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg border text-center 
              font-medium ${
                selectedTime === time
                  ? "border-blue-500 bg-blue-100 text-blue-800"
                  : "border-blue-200 hover:border-blue-300 text-blue-700"
              }`}
              >
                {time}
              </button>
            ))}
          </div>

          {(selectedDate || selectedTime) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                Selected Appointment
              </h3>
              {selectedDate && (
                <p className="text-blue-900">
                  Date: {selectedDate.day}, {selectedDate.month}{" "}
                  {selectedDate.date}
                </p>
              )}
              {selectedTime && (
                <p className="text-blue-900">Time: {selectedTime}</p>
              )}
            </div>
          )}

          <textarea
            className="w-full border border-blue-300 rounded-lg p-3 mb-6"
            placeholder="Any message or health concern?"
            rows="3"
            value={userInfo.message}
            onChange={(e) =>
              setUserInfo({ ...userInfo, message: e.target.value })
            }
          />

          <div className="text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg 
            shadow-md transition w-full max-w-md disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={!selectedDate || !selectedTime}
              onClick={handleBooking}
            >
              Book an appointment
            </button>
          </div>
        </div>

        {relatedDoctors.length > 0 && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Related Doctors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedDoctors.map((doctor) => (
                <Link
                  to={`/appointment/${doctor._id}`}
                  key={doctor._id}
                  className="flex items-center gap-4 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-blue-700">{doctor.speciality}</p>
                    <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Appointment;
