import React, { useState } from "react";
import Slider from "react-slick";
import { assets } from "../assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiClipboardDocument } from "react-icons/hi2";
import { HiClock } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import { HiShieldCheck } from "react-icons/hi2";

const whyChooseUsData = [
  {
    title: "Efficiency",
    subtitle: "Streamlined scheduling",
    details:
      "Our platform minimizes delays and maximizes your convenience by connecting you to providers quickly.",
    icon: <HiClipboardDocument className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Convenience",
    subtitle: "Trusted providers nearby",
    details:
      "Find doctors near you and book appointments with just a few clicks anytime, anywhere.",
    icon: <HiClock className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Personalization",
    subtitle: "Tailored health plans",
    details:
      "Get recommendations and plans personalized for your health history and goals.",
    icon: <HiUser className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Security",
    subtitle: "Protected health data",
    details:
      "We prioritize your privacy with end-to-end encryption and compliance with data standards.",
    icon: <HiShieldCheck className="h-5 w-5 text-blue-600" />,
  },
];

const AboutUs1 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleCard = (index) =>
    setOpenIndex(openIndex === index ? null : index);

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
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-6 inline-block">
            ABOUT <span className="text-blue-600">AAROGYA SAPNA</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src={assets.about_image}
                alt="AarogyaSapna healthcare services"
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-blue-600">
                  Aarogya Sapna
                </span>
                , your trusted partner in managing healthcare needs conveniently
                and efficiently. We understand the challenges individuals face
                when scheduling doctor appointments and managing health records.
              </p>
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Aarogya Sapna is committed to excellence in healthcare
                technology. We continuously enhance our platform with the latest
                advancements to improve user experience and deliver superior
                service. Whether booking your first appointment or managing
                ongoing care, we're here to support you.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-3">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  To create a seamless healthcare experience that bridges the
                  gap between patients and providers, making quality care
                  accessible when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-8 inline-block">
            WHY CHOOSE <span className="text-blue-600">AAROGYA SAPNA</span>
          </h1>
          <Slider {...sliderSettings}>
            {whyChooseUsData.map((item, index) => (
              <div key={index} className="px-3">
                <div
                  onClick={() => toggleCard(index)}
                  className="bg-white p-4 cursor-pointer border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-700">
                        {item.title}
                      </h3>
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
            Aarogya Sapna <span className="text-blue-600">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                10K+
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Patients Served
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                500+
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Healthcare Partners
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                24/7
              </div>
              <div className="text-xs md:text-sm text-gray-600">Support</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                98%
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Satisfaction
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AboutUs1;
