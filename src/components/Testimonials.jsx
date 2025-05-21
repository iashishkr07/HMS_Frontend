import React, { useState } from 'react';
import { User, MessageSquare } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from './Navbar';

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Anjali Sharma',
      message: 'AarogyaSapna provided exceptional care during my treatment. Highly recommended!',
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      message: 'Excellent doctors and seamless experience. Grateful for the quick response.',
    },
    {
      id: 3,
      name: 'Pooja Patel',
      message: 'Very professional and helpful staff. My issue was resolved promptly.',
    },
    {
      id: 4,
      name: 'Suresh Mehta',
      message: 'Top-notch medical support and very clean facilities. Felt safe and well cared for.',
    },
    {
      id: 5,
      name: 'Meena Joshi',
      message: 'My family and I always trust AarogyaSapna for any medical concerns. They never disappoint.',
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
    };
    setTestimonials([...testimonials, newTestimonial]);
    setFormData({ name: '', message: '' });
    setShowModal(false);
  };

  return (
    <>
    <Navbar />
    <div className='bg-gradient-to-r from-white to-blue-50'>
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        What Our Patients Say
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full"
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
        >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md h-full flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800">
                  {testimonial.name.charAt(0)}
                </div>
                <h4 className="text-blue-700 font-semibold text-sm">{testimonial.name}</h4>
              </div>
              <p className="text-gray-700 text-sm">{testimonial.message}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition duration-300"
          >
          Submit Your Testimonial
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
              Submit Your Testimonial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <User size={16} /> Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <MessageSquare size={16} /> Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition duration-300"
                >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Testimonials;
