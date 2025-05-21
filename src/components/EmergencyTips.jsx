import React from 'react';
import { HeartPulse, ShieldAlert, HandHelping, AlertCircle } from 'lucide-react';

const tips = [
  {
    icon: <HeartPulse size={28} className="text-red-600" />,
    title: 'Stay Calm',
    description: 'Panic can worsen the situation. Stay calm and focus on safety and immediate steps.',
  },
  {
    icon: <ShieldAlert size={28} className="text-red-600" />,
    title: 'Ensure Safety',
    description: 'Ensure the scene is safe before helping someone injured or unconscious.',
  },
  {
    icon: <HandHelping size={28} className="text-red-600" />,
    title: 'Call Emergency',
    description: 'Dial emergency services (like 108 in India) without delay. Provide accurate info.',
  },
  {
    icon: <AlertCircle size={28} className="text-red-600" />,
    title: 'First Aid',
    description: 'If trained, provide basic first aid until professional help arrives.',
  },
];

const EmergencyTips = () => {
  return (
    <div className="bg-gradient-to-r from-white to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">
          Emergency Tips to Follow
        </h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          In critical moments, every second counts. Here are quick emergency guidelines to help you respond effectively before professional help arrives.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {tips.map((tip, index) => (
            <div key={index} className="p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                {tip.icon}
                <h3 className="text-lg font-semibold text-red-800">{tip.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyTips;
