import React, { useState, useEffect } from "react";
import axios from "../api";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

const MyAppointments = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ FullName: "", Email: "", profilePic: "" });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          const bookingsRes = await axios.get(`/bookings/${email}`);
          const bookingsData = Array.isArray(bookingsRes.data)
            ? bookingsRes.data
            : [bookingsRes.data];

          // Fetch doctor details for each booking
          const bookingsWithDoctorDetails = await Promise.all(
            bookingsData.map(async (booking) => {
              try {
                const doctorRes = await axios.get(
                  `/doctors/name/${booking.doctor}`
                );
                return { ...booking, doctorDetails: doctorRes.data.data };
              } catch (doctorErr) {
                console.error(
                  `Failed to fetch details for doctor ${booking.doctor}:`,
                  doctorErr
                );
                return { ...booking, doctorDetails: null }; // Add null doctorDetails if fetch fails
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
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
              No bookings found
            </h3>
            <p className="text-gray-500">
              You haven't made any appointments yet.
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
                          <span className="font-semibold">Fees:</span> 
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

                <div className="mt-4 flex justify-end">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default MyAppointments;
