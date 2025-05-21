import React from 'react';
import { Ambulance } from 'lucide-react';

const RequestAmbulance = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Ambulance size={40} className="animate-pulse" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Need an Ambulance?</h2>
            <p className="text-sm md:text-base text-red-100 mt-1">
              We dispatch within 10 minutes in metro areas. Available 24/7.
            </p>
          </div>
        </div>

        <a
          href="tel:+919876543210"
          className="bg-white text-red-600 hover:bg-red-100 font-semibold px-6 py-3 rounded-lg text-sm md:text-base shadow-md transition"
        >
          📞 Request Now: +91-9876543210
        </a>
      </div>
    </div>
  );
};

export default RequestAmbulance;
