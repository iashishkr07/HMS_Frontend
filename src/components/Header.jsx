import { Link } from 'react-router-dom';
import {assets} from '../assets/assets'

const Header = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Welcome to <span className="text-blue-600">AarogyaSapna</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Your trusted partner in health and wellness. Connect with experienced doctors and access world-class healthcare, anytime, anywhere.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Book Appointment
            </Link>
            <Link
              to="/doctors"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-50 transition"
            >
              Find Doctors
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src={assets.header_img}
            alt="Doctor illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
