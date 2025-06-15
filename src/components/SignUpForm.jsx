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
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <ToastContainer />
        <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please sign up to book appointment
          </p>

          {errors.form && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col items-center mb-6">
              <div
                className="relative w-24 h-24 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={triggerFileInput}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">+</span>
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
              <p className="text-xs text-gray-500 mt-2">
                Click to upload photo
              </p>
            </div>

            <label className="block mb-1 text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="FullName"
              value={form.FullName}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                loading ? "bg-gray-100" : ""
              }`}
            />
            {errors.FullName && (
              <p className="text-sm text-red-600 mb-2">{errors.FullName}</p>
            )}

            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                loading ? "bg-gray-100" : ""
              }`}
            />
            {errors.Email && (
              <p className="text-sm text-red-600 mb-2">{errors.Email}</p>
            )}

            <label className="block mb-1 text-sm text-gray-600">Phone</label>
            <input
              type="tel"
              name="Phone"
              value={form.Phone}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                loading ? "bg-gray-100" : ""
              }`}
            />

            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                value={form.Password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                  loading ? "bg-gray-100" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.Password && (
              <p className="text-sm text-red-600 mb-2">{errors.Password}</p>
            )}

            <label className="block mb-1 text-sm text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="ConfirmPassword"
                value={form.ConfirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={`w-full mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                  loading ? "bg-gray-100" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
                disabled={loading}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.ConfirmPassword && (
              <p className="text-sm text-red-600 mb-4">
                {errors.ConfirmPassword}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
