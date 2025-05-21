import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar1 = () => {
  const navigate = useNavigate();



  return (

    <nav className="navbar">
      <div className="navbar-header">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="logo object-cover cursor-pointer w-full h-full"
        />
      </div>
      <div className="navbar-right flex items-center space-x-4 mx-8 mt-4 md:mt-0">

      <Link to="/" className="btn btn-outline rounded-full">
          Logout
        </Link>
      </div>
    </nav>

  );
};

export default Navbar1;
