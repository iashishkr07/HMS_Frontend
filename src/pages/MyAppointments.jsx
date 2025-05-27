import React, { useState, useEffect } from "react";
import axios from "../api";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ FullName: "", Email: "", profilePic: "" });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    date: "",
    time: "",
    message: "",
    phone: "",
    doctor: "",
    doctorDetails: null,
    bookingId: "",
    email: "",
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

  const generateCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateValid = (dateString) => {
    const bookingDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return bookingDate >= today;
  };

  const isSameDay = (dateString) => {
    const bookingDate = new Date(dateString);
    const today = new Date();
    return (
      bookingDate.getFullYear() === today.getFullYear() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getDate() === today.getDate()
    );
  };

  const generateAvailableDates = () => {
    const dates = [];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const day = days[date.getDay()];
      const dayNum = date.getDate();
      // Store value as YYYY-MM-DD for backend, but display as friendly
      const value = `${year}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dayNum).padStart(2, "0")}`;
      dates.push({
        day,
        date: dayNum,
        month,
        year,
        value,
        display: `${day} ${dayNum} ${month}`,
      });
    }
    return dates;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data.user;
          setUser({
            FullName: userData.FullName,
            Email: userData.Email,
            profilePic: userData.profilePic || assets.profile_pic,
          });
          return userData.Email;
        })
        .then(async (email) => {
          const bookingsRes = await axios.get(
            `https://backend-z1qz.onrender.com/api/bookings/${email}`
          );
          const bookingsData = Array.isArray(bookingsRes.data)
            ? bookingsRes.data
            : [bookingsRes.data];

          const validBookings = bookingsData.filter((booking) =>
            isDateValid(booking.date)
          );

          const bookingsWithDoctorDetails = await Promise.all(
            validBookings.map(async (booking) => {
              try {
                const doctorRes = await axios.get(
                  `https://backend-z1qz.onrender.com/api/doctors/name/${booking.doctor}`
                );
                return { ...booking, doctorDetails: doctorRes.data.data };
              } catch (doctorErr) {
                console.error(
                  `Failed to fetch details for doctor ${booking.doctor}:`,
                  doctorErr
                );
                return { ...booking, doctorDetails: null };
              }
            })
          );

          setBookings(bookingsWithDoctorDetails);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch failed", err);
          setIsLoggedIn(false);
          setError("Failed to load bookings. Please try again later.");
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    let dateWithYear = dateString;
    const yearRegex = /\b\d{4}\b/;
    if (!yearRegex.test(dateString)) {
      const currentYear = new Date().getFullYear();
      dateWithYear = dateString + `, ${currentYear}`;
    }
    const dateObj = new Date(dateWithYear);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return isNaN(dateObj)
      ? dateString
      : dateObj.toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`https://backend-z1qz.onrender.com/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      toast.success("Appointment deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error("Failed to delete booking:", err);
      toast.error("Failed to delete appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    let backendDate = booking.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date)) {
      const d = new Date(booking.date);
      backendDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    }
    // Convert the booking time to match the timeSlots format
    const timeMatch = booking.time?.match(
      /(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/
    );
    const formattedTime = timeMatch ? timeMatch[0] : "";
    setUpdateForm({
      date: backendDate,
      time: formattedTime,
      message: booking.message || "",
      phone: booking.phone || "",
      doctor: booking.doctor,
      doctorDetails: booking.doctorDetails,
      bookingId: booking.bookingId,
      email: booking.email,
    });
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Check if the new date is the same as the original booking date
    if (updateForm.date === selectedBooking.date) {
      toast.error(
        "Cannot update appointment to the same date. Please choose a different date.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    try {
      const response = await axios.put(
        `https://backend-z1qz.onrender.com/api/bookings/${selectedBooking._id}`,
        updateForm
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, ...response.data }
            : booking
        )
      );
      setShowModal(false);
      setError(null);
      toast.success("Appointment updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error("Failed to update booking:", err);
      toast.error("Failed to update appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Access Required
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to view your booking history.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4 text-red-600">
          Error
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Booking History</h1>
          </div>

          {bookings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No upcoming appointments
              </h3>
              <p className="text-gray-500">
                You don't have any current or upcoming appointments.
              </p>
              <button
                onClick={() => (window.location.href = "/book-appointment")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-150 ease-in-out"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <img
                        src={booking.doctorDetails?.image || assets.profile_pic}
                        alt={booking.doctorDetails?.name || "Doctor"}
                        className="w-20 h-20 rounded-full object-cover border border-gray-300"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.doctorDetails?.name || booking.doctor}
                      </h3>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.bookingId}
                      </h3>

                      <p className="text-blue-600 font-medium mb-2">
                        {booking.doctorDetails?.degree || "Speciality N/A"}
                      </p>

                      <div className="text-gray-600 text-sm space-y-1">
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {formatDate(booking.date)}
                        </p>
                        {booking.doctorDetails?.fees && (
                          <p>
                            <span className="font-semibold">Fees:</span>{" "}
                            {booking.doctorDetails.fees}
                          </p>
                        )}
                        {booking.phone && (
                          <p>
                            <span className="font-semibold">Contact:</span>{" "}
                            {booking.phone}
                          </p>
                        )}
                        {booking.message && (
                          <p>
                            <span className="font-semibold">Notes:</span>{" "}
                            {booking.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isSameDay(booking.date) ? (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Dear {user.FullName}, you cannot update or cancel
                              appointments scheduled for today. Please contact
                              the hospital directly for any urgent changes.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleUpdate(booking)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full h-[500px] mt-10">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Update Appointment</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-2 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booking ID
                    </label>
                    <input
                      type="text"
                      value={updateForm.bookingId}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Doctor
                    </label>
                    <input
                      type="text"
                      value={
                        updateForm.doctorDetails?.name || updateForm.doctor
                      }
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Speciality
                    </label>
                    <input
                      type="text"
                      value={updateForm.doctorDetails?.degree || "N/A"}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={updateForm.email}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <select
                      name="date"
                      value={updateForm.date}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                    >
                      <option value="" disabled>
                        Select a date
                      </option>
                      {generateAvailableDates().map((date, index) => (
                        <option key={index} value={date.value}>
                          {date.day}, {date.date} {date.month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time Slot
                    </label>
                    <select
                      name="time"
                      value={updateForm.time}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                    >
                      <option value="" disabled>
                        Select a time slot
                      </option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={updateForm.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setError(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Update Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppointments;
