import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaCamera, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: {
      street: "",
      city: "",
    },
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = {
      name: "Full Name",
      email: "Email",
      password: "Password",
      speciality: "Speciality",
      degree: "Degree",
      experience: "Experience",
      fees: "Fees",
      about: "About",
      "address.street": "Street Address",
      "address.city": "City",
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        if (!formData[parent][child]) {
          missingFields.push(label);
        }
      } else if (!formData[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (!image) {
      toast.error("Please upload a profile picture");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "address") {
          data.append("address", JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      if (image) data.append("image", image);

      const response = await axios.post(
        "https://backend-z1qz.onrender.com/api/add-doctor",
        data
      );
      console.log("Doctor added:", response.data);
      toast.success("Doctor added successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fees: "",
        address: {
          street: "",
          city: "",
        },
      });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add doctor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                <FaUserMd className="text-lg" />
              </div>
              Add New Doctor
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Uploader - Centered */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40 group">
                <div
                  className="w-full h-full border-2 border-dashed border-teal-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-teal-500 transition-all duration-300 group-hover:shadow-lg bg-gradient-to-br from-white to-teal-50"
                  onClick={() =>
                    document.getElementById("profile-upload").click()
                  }
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <FaCamera className="text-white text-2xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-3">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                        <FaCamera className="text-teal-500 text-2xl" />
                      </div>
                      <p className="text-sm text-gray-600">Click to upload</p>
                      <p className="text-xs text-teal-500 mt-1">Max: 2MB</p>
                    </div>
                  )}
                </div>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Personal Info
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Professional Info
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Speciality"
                  />
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Experience"
                  />
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Fees"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Contact Info
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50"
                    placeholder="City"
                  />
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/50 h-24"
                    placeholder="About the doctor..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Add Doctor
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
