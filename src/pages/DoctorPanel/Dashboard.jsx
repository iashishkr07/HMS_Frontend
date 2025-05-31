import React, { useState, useEffect } from "react";
import { FaUserMd, FaCalendarAlt, FaChartLine, FaBell } from "react-icons/fa";
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
        const todayAppointments = bookingsData.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.toDateString() === today.toDateString();
        });

        // Calculate total fees from all bookings
        const totalFees = bookingsData.reduce(
          (sum, booking) => sum + (booking.fees || 0),
          0
        );

        setStats({
          totalPatients: bookingsData.length,
          todayAppointments: todayAppointments.length,
          monthlyRevenue: totalFees,
          notifications: bookingsData.filter((b) => b.status === "pending")
            .length,
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
                  ₹{Number(stats.monthlyRevenue)}
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

        {/* Recent Activity and Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking._id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUserMd className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Patient Consultation
                      </p>
                      <p className="text-sm text-gray-500">
                        Completed consultation with {booking.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(booking.date).toLocaleDateString()} at{" "}
                        {booking.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Upcoming Appointments
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bookings
                  .filter((booking) => new Date(booking.date) >= new Date())
                  .slice(0, 3)
                  .map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {booking.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {booking.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.type || "General Checkup"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
