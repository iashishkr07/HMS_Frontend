import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const TimeTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const schedule = [
    { time: "9:00", slots: [0, 1, 2, 3, 4, 5, 6] },
    { time: "10:00", slots: [7, 8, 9, 10, 11, 12, 13] },
    { time: "11:00", slots: [0, 1, 2, 3, 4, 5, 6] },
    { time: "12:00", slots: [7, 8, 9, 10, 11, 12, 13] },
    { time: "14:00", slots: [0, 1, 2, 3, 4, 5, 6] },
    { time: "15:00", slots: [7, 8, 9, 10, 11, 12, 13] },
    { time: "16:00", slots: [0, 1, 2, 3, 4, 5, 6] },
    { time: "17:00", slots: [7, 8, 9, 10, 11, 12, 13] },
    { time: "18:00", slots: [0, 1, 2, 3, 4, 5, 6] },
  ];

  const days = [
    "Time",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://backend-z1qz.onrender.com/api/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors data");
        setLoading(false);
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Determine Your Date To Come
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Select the most convenient time for your visit.
          </p>
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
            <table className="w-full text-left border-collapse bg-gradient-to-r from-blue-50 to-white">
              <thead>
                <tr>
                  {days.map((day, index) => (
                    <th
                      key={index}
                      className="bg-blue-600 text-white p-4 text-sm font-semibold"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t">
                    <td className="bg-green-100 text-green-700 text-center p-4 font-semibold text-sm rounded-l-lg">
                      {row.time}
                    </td>
                    {row.slots.map((doctorIndex, slotIndex) => (
                      <td key={slotIndex} className="p-4 text-center text-sm">
                        {doctors[doctorIndex] ? (
                          <div>
                            <span className="font-semibold text-gray-900">
                              {doctors[doctorIndex].name}
                            </span>
                            <br />
                            <span className="text-gray-500 text-xs">
                              {doctors[doctorIndex].speciality}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
