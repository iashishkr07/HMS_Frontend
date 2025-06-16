import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import doctorApi from "../../doctorApi";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    notifications: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await doctorApi.get("/doctor/bookings");
        const bookingsData = response.data.bookings;
        setBookings(bookingsData);

        // Calculate statistics
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get first day of current month
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

        // Filter today's appointments
        const todayAppointments = bookingsData.filter((booking) => {
          const bookingDate = new Date(booking.date);
          bookingDate.setHours(0, 0, 0, 0);
          return bookingDate.getTime() === today.getTime();
        });

        // Calculate monthly revenue (only from completed appointments)
        const monthlyRevenue = bookingsData
          .filter((booking) => {
            const bookingDate = new Date(booking.date);
            return (
              bookingDate >= firstDayOfMonth && booking.status === "completed"
            );
          })
          .reduce((sum, booking) => sum + Number(booking.fees || 0), 0);

        // Count unique patients
        const uniquePatients = new Set(
          bookingsData.map((booking) => booking.email)
        ).size;

        // Count pending notifications
        const pendingNotifications = bookingsData.filter(
          (booking) => booking.status === "pending"
        ).length;

        setStats({
          totalPatients: uniquePatients,
          todayAppointments: todayAppointments.length,
          monthlyRevenue: monthlyRevenue,
          notifications: pendingNotifications,
        });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaUserMd className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Total Patients</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalPatients}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaCalendarAlt className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Today's Appointments</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.todayAppointments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaChartLine className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Monthly Revenue</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FaBell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Pending Notifications</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.notifications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {bookings
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUserMd className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">
                          {booking.name}
                        </h4>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            {new Date(
                              booking.date
                            ).toLocaleDateString()} at {booking.timeslot}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaPhone className="mr-2" />
                            {booking.phone}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaEnvelope className="mr-2" />
                            {booking.email}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">
                              Consultation Type:
                            </span>{" "}
                            {booking.type || "General Checkup"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Fees:</span> ₹
                            {Number(booking.fees || 0).toLocaleString()}
                          </p>
                          {booking.message && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Message:</span>{" "}
                              {booking.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
