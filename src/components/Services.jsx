import React, { useState } from 'react';
import { FaClipboardList, FaTooth, FaHeart, FaDeaf, FaEye, FaTint } from 'react-icons/fa';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      title: "General Treatment",
      icon: <FaClipboardList className="text-4xl text-blue-600" />,
      description: "Comprehensive care for common illnesses and preventive health needs.",
      details: "We treat everything from flu and fevers to routine checkups, blood pressure, and infections. Consultations are available daily with our general physicians."
    },
    {
      title: "Teeth Whitening",
      icon: <FaTooth className="text-4xl text-blue-600" />,
      description: "Brighten your smile with professional and safe whitening treatments.",
      details: "We use modern dental technology to remove deep stains and discoloration, enhancing your smile safely and effectively."
    },
    {
      title: "Heart Surgery",
      icon: <FaHeart className="text-4xl text-blue-600" />,
      description: "Surgical treatments for heart disease and cardiovascular conditions.",
      details: "Our expert surgeons handle bypass surgeries, valve repairs, and stents with advanced post-op cardiac care."
    },
    {
      title: "Ear Treatment",
      icon: <FaDeaf className="text-4xl text-blue-600" />,
      description: "Specialized treatment for ear infections, hearing loss, and more.",
      details: "From wax removal to ear drum repair and hearing aids, we provide a full range of ENT services for all age groups."
    },
    {
      title: "Vision Problems",
      icon: <FaEye className="text-4xl text-blue-600" />,
      description: "Solutions for blurry vision, eye strain, and other optical issues.",
      details: "We provide consultations for glasses, contacts, LASIK evaluations, and treatment for eye infections or cataracts."
    },
    {
      title: "Blood Transfusion",
      icon: <FaTint className="text-4xl text-blue-600" />,
      description: "Safe and monitored blood transfusion services.",
      details: "Our blood bank ensures proper matching, infection-free transfusions, and continuous patient monitoring during the procedure."
    }
  ];

  const openModal = (service) => {
    setActiveService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveService(null);
  };

  return (
    <>
    <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">We Offer Different Services To Improve Your Health</h2>
          <p className="text-gray-500 mt-2">Explore top-quality care for your body and mind.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <button
                className="mt-4 text-blue-600 hover:underline font-medium"
                onClick={() => openModal(service)}
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full relative shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-red-600 text-xl"
              onClick={closeModal}
              >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{activeService.title}</h2>
            <p className="text-gray-600">{activeService.details}</p>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Services;
