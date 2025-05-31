import React from 'react';
import { PhoneCall, DollarSign, FileText, UserCheck, Building2, Smile } from 'lucide-react';
import whyChooseUsImg from '../assets/whychooseus.jpg'; 


const WhyChooseUs = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-white to-blue-100 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
          WHY CHOOSE <span className="text-green-600">AAROGYA SAPNA?</span>
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          We are committed to providing exceptional healthcare with compassion and innovation. Serving families and communities with trust since 1998.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Left side */}
        <div className="space-y-10">
          <div className="flex items-start gap-4">
            <PhoneCall size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">24x7 Helpline</h4>
              <p className="text-gray-600 text-sm">Immediate support from medical experts around the clock.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <DollarSign size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Affordable Plans</h4>
              <p className="text-gray-600 text-sm">Quality care with transparent and budget-friendly pricing.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FileText size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Health Record Access</h4>
              <p className="text-gray-600 text-sm">Secure access to your health data anytime, anywhere.</p>
            </div>
          </div>
        </div>

        <img
          src={whyChooseUsImg}
          alt="Doctor"
          className="w-[280px] sm:w-[340px] rounded-xl shadow-md "
        />

        <div className="space-y-10">
          <div className="flex items-start gap-4">
            <UserCheck size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Experienced Doctors</h4>
              <p className="text-gray-600 text-sm">A team of specialists with years of clinical excellence.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Building2 size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Modern Infrastructure</h4>
              <p className="text-gray-600 text-sm">Advanced technology for accurate and fast diagnosis.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Smile size={30} className="text-green-600" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Patient-Centric Approach</h4>
              <p className="text-gray-600 text-sm">Personalized care focused on your wellness and comfort.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
