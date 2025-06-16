import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";
import Navbar from "./Navbar";

const SignUpForm = () => {
  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
    profilePic: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.FullName.trim()) newErrors.FullName = "Full name is required";
    if (form.FullName.length > 50) newErrors.FullName = "Name is too long";

    if (!form.Email.trim()) newErrors.Email = "Email is required";
    else if (!emailRegex.test(form.Email))
      newErrors.Email = "Invalid email format";

    if (!form.Password) newErrors.Password = "Password is required";
    else if (form.Password.length < 6)
      newErrors.Password = "Password must be at least 6 characters";
    else if (form.Password.length > 50)
      newErrors.Password = "Password is too long";

    if (form.Password !== form.ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      setForm({ ...form, profilePic: file });

      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("FullName", form.FullName);
      formData.append("Email", form.Email);
      formData.append("Phone", form.Phone);
      formData.append("Password", form.Password);
      if (form.profilePic) {
        formData.append("profilePic", form.profilePic);
      }

      const res = await API.post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message;
      if (message?.toLowerCase().includes("email")) {
        setErrors({ ...errors, Email: message });
      } else if (message?.toLowerCase().includes("password")) {
        setErrors({ ...errors, Password: message });
      } else {
        toast.error(message || "Signup failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setErrors({
          ...errors,
          form: message || "Signup failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <ToastContainer />
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-4 md:p-6 lg:p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-2 md:mb-2 text-center">
            Create Account
          </h2>
          <p className="text-sm sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-4 md:mb-6 text-center">
            Please sign up to book appointment
          </p>

          {errors.form && (
            <div className="mb-4 sm:mb-3 md:mb-4 p-3 sm:p-2 md:p-3 bg-red-50 text-red-600 rounded-lg text-sm sm:text-sm md:text-base border border-red-200">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-6">
              <div className="flex items-center justify-center sm:justify-start md:justify-center mb-4 sm:mb-0">
                <div
                  className="relative w-28 h-28 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-400 transition-colors duration-300"
                  onClick={triggerFileInput}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-blue-400 text-4xl sm:text-3xl md:text-4xl lg:text-5xl block mb-2">
                        +
                      </span>
                      <span className="text-blue-400 text-sm sm:text-xs md:text-sm">
                        Upload Photo
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={loading}
                  className="hidden"
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 md:gap-6">
                  <div>
                    <label className="block mb-2 sm:mb-1 md:mb-1 text-sm sm:text-sm md:text-base font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="FullName"
                      value={form.FullName}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-4 sm:px-3 md:px-4 py-3 sm:py-2 md:py-2.5 text-base sm:text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                        loading ? "bg-gray-50" : "bg-white"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.FullName && (
                      <p className="mt-2 sm:mt-1 text-sm sm:text-sm md:text-base text-red-500">
                        {errors.FullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 sm:mb-1 md:mb-1 text-sm sm:text-sm md:text-base font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={form.Email}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-4 sm:px-3 md:px-4 py-3 sm:py-2 md:py-2.5 text-base sm:text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                        loading ? "bg-gray-50" : "bg-white"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.Email && (
                      <p className="mt-2 sm:mt-1 text-sm sm:text-sm md:text-base text-red-500">
                        {errors.Email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 sm:mb-1 md:mb-1 text-sm sm:text-sm md:text-base font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={form.Phone}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-4 sm:px-3 md:px-4 py-3 sm:py-2 md:py-2.5 text-base sm:text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                        loading ? "bg-gray-50" : "bg-white"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 sm:mb-1 md:mb-1 text-sm sm:text-sm md:text-base font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="Password"
                        value={form.Password}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full px-4 sm:px-3 md:px-4 py-3 sm:py-2 md:py-2.5 text-base sm:text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                          loading ? "bg-gray-50" : "bg-white"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-sm sm:text-sm md:text-base text-gray-500 hover:text-gray-700"
                        disabled={loading}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.Password && (
                      <p className="mt-2 sm:mt-1 text-sm sm:text-sm md:text-base text-red-500">
                        {errors.Password}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 sm:mb-1 md:mb-1 text-sm sm:text-sm md:text-base font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="ConfirmPassword"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full px-4 sm:px-3 md:px-4 py-3 sm:py-2 md:py-2.5 text-base sm:text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                          loading ? "bg-gray-50" : "bg-white"
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-sm sm:text-sm md:text-base text-gray-500 hover:text-gray-700"
                        disabled={loading}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.ConfirmPassword && (
                      <p className="mt-2 sm:mt-1 text-sm sm:text-sm md:text-base text-red-500">
                        {errors.ConfirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 sm:mt-4 md:mt-6 py-3 sm:py-2 md:py-3 text-base sm:text-base md:text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-sm sm:text-sm md:text-base text-gray-600 mt-4 sm:mt-4 md:mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
