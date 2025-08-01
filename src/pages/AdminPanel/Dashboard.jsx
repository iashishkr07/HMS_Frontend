import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBed,
  FaCalendarCheck,
  FaChartLine,
  FaUserMd,
} from "react-icons/fa";
import API from "../../api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Patients",
      value: "0",
      icon: <FaUsers className="text-blue-500" />,
      change: "0%",
    },
    {
      title: "Total Doctors",
      value: "0",
      icon: <FaUserMd className="text-indigo-500" />,
      change: "0%",
    },
    {
      title: "Available Rooms",
      value: "0",
      icon: <FaBed className="text-green-500" />,
      change: "0%",
    },
    {
      title: "Appointments Today",
      value: "0",
      icon: <FaCalendarCheck className="text-purple-500" />,
      change: "0%",
    },
    {
      title: "Revenue",
      value: "$0",
      icon: <FaChartLine className="text-orange-500" />,
      change: "0%",
    },
  ]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all required data in parallel
        const [bookingsRes, doctorsRes] = await Promise.all([
          API.get("/bookings"),
          API.get("/doctors"),
        ]);

        const bookings = bookingsRes.data;
        const doctors = doctorsRes.data.doctors || doctorsRes.data;

        // Calculate today's appointments
        const today = new Date();
        const todayAppointments = bookings.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return (
            bookingDate.getDate() === today.getDate() &&
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getFullYear() === today.getFullYear()
          );
        });

        // Calculate total revenue (assuming each appointment has a fee)
        const totalRevenue = bookings.reduce((sum, booking) => {
          return sum + (Number(booking.fees) || 0);
        }, 0);

        // Update stats
        setStats([
          {
            title: "Total Patients",
            value: bookings.length.toString(),
            icon: <FaUsers className="text-blue-500" />,
            change: "+12%",
          },
          {
            title: "Total Doctors",
            value: doctors.length.toString(),
            icon: <FaUserMd className="text-indigo-500" />,
            change: "+5%",
          },
          {
            title: "Available Rooms",
            value: "45", // This should come from your rooms API
            icon: <FaBed className="text-green-500" />,
            change: "-2%",
          },
          {
            title: "Appointments Today",
            value: todayAppointments.length.toString(),
            icon: <FaCalendarCheck className="text-purple-500" />,
            change: `${todayAppointments.length > 0 ? "+" : ""}${
              todayAppointments.length
            }%`,
          },
          {
            title: "Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: <FaChartLine className="text-orange-500" />,
            change: "+8%",
          },
        ]);

        // Format recent activities
        const activities = bookings.slice(0, 4).map((booking) => ({
          id: booking._id,
          action: `Appointment with Dr. ${booking.doctor}`,
          time: new Date(booking.createdAt).toLocaleString(),
        }));

        setRecentActivities(activities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-green-500 text-sm mt-2">{stat.change}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Add New Patient
            </button>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
              Schedule Appointment
            </button>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors">
              View Reports
            </button>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
              Manage Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
