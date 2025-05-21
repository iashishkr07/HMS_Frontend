import React from 'react';
import { Phone, AlertTriangle, MapPin, Clock } from 'lucide-react';

const EmergencyBanner = () => {
  return (
    <div className='bg-gradient-to-r from-blue-100 to-white'>
    <div className="max-w-5xl mx-auto px-4 py-12 ">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-6">
        Emergency Help – AarogyaSapna
      </h1>

      <p className="text-gray-700 text-center max-w-3xl mx-auto mb-10">
        In case of a medical emergency, please use the contact details below to reach us immediately. We are available 24/7 to assist you with critical situations.
      </p>

      <div className="grid md:grid-cols-2 gap-8 ">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-500" />
            <h3 className="text-xl font-semibold text-red-700">Emergency Numbers</h3>
          </div>
          <ul className="space-y-2 text-gray-800 text-sm">
            <li><strong>Ambulance:</strong> 102</li>
            <li><strong>Fire Brigade:</strong> 101</li>
            <li><strong>Police:</strong> 100</li>
            <li><strong>National Emergency:</strong> 112</li>
            <li><strong>AarogyaSapna Emergency Helpline:</strong> +91-1234567890</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Phone size={24} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-blue-800">Hospital Hotlines</h3>
          </div>
          <ul className="space-y-2 text-gray-800 text-sm">
            <li><strong>24/7 Emergency Desk:</strong> +91-9090909090</li>
            <li><strong>Cardiology Emergency:</strong> +91-9123456789</li>
            <li><strong>Pediatrics:</strong> +91-9988776655</li>
            <li><strong>Trauma Care:</strong> +91-8877665544</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock size={24} className="text-green-600" />
          <h3 className="text-xl font-semibold text-green-800">Emergency Response Info</h3>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          If someone near you is experiencing a medical emergency (e.g. chest pain, unconsciousness, heavy bleeding, or difficulty breathing), please:
        </p>
        <ul className="list-disc ml-6 mt-3 text-sm text-gray-800 space-y-1">
          <li>Call 112 or our helpline immediately.</li>
          <li>Stay calm and provide first aid if trained.</li>
          <li>Don’t move the patient unnecessarily.</li>
          <li>Keep vital information ready: age, condition, and exact location.</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default EmergencyBanner;
