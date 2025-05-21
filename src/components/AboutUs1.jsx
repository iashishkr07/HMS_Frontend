import React, { useState } from 'react';
import Slider from 'react-slick';
import { assets } from '../assets/assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const whyChooseUsData = [
  {
    title: 'Efficiency',
    subtitle: 'Streamlined scheduling',
    details: 'Our platform minimizes delays and maximizes your convenience by connecting you to providers quickly.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    )
  },
  {
    title: 'Convenience',
    subtitle: 'Trusted providers nearby',
    details: 'Find doctors near you and book appointments with just a few clicks anytime, anywhere.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  },
  {
    title: 'Personalization',
    subtitle: 'Tailored health plans',
    details: 'Get recommendations and plans personalized for your health history and goals.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    )
  },
  {
    title: 'Security',
    subtitle: 'Protected health data',
    details: 'We prioritize your privacy with end-to-end encryption and compliance with data standards.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    )
  }
];

const AboutUs1 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleCard = (index) => setOpenIndex(openIndex === index ? null : index);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className='bg-gradient-to-r from-blue-50 to-white'>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-6 inline-block">
          ABOUT <span className="text-blue-600">AAROGYASAPNA</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img src={assets.about_image} alt="AarogyaSapna healthcare services" className="w-full h-auto rounded-xl shadow-md object-cover" />
          </div>
          <div className="md:w-1/2">
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Welcome to <span className="font-semibold text-blue-600">AarogyaSapna</span>, your trusted partner in managing healthcare needs conveniently and efficiently. We understand the challenges individuals face when scheduling doctor appointments and managing health records.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              AarogyaSapna is committed to excellence in healthcare technology. We continuously enhance our platform with the latest advancements to improve user experience and deliver superior service. Whether booking your first appointment or managing ongoing care, we're here to support you.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To create a seamless healthcare experience that bridges the gap between patients and providers, making quality care accessible when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-8 inline-block">
          WHY CHOOSE <span className="text-blue-600">AAROGYASAPNA</span>
        </h1>
        <Slider {...sliderSettings}>
          {whyChooseUsData.map((item, index) => (
            <div key={index} className="px-3">
              <div onClick={() => toggleCard(index)}
                className="bg-white p-4 cursor-pointer border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-700">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
                {openIndex === index && (
                  <p className="mt-3 text-sm text-gray-700 transition-all duration-300">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          AarogyaSapna <span className="text-blue-600">Achievements</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-xs md:text-sm text-gray-600">Patients Served</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-xs md:text-sm text-gray-600">Healthcare Partners</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-xs md:text-sm text-gray-600">Support</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Satisfaction</div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};
export default AboutUs1;
