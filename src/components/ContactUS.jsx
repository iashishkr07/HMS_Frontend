import React, { useState } from "react";
import { Mail, User, MessageSquare, Phone, MapPin, Send } from "lucide-react";

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch("https://backend-z1qz.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Message sending failed.");
      }

      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({
        loading: false,
        error: error.message || "Something went wrong. Please try again.",
        success: false,
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-white py-20 px-4 relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-6 inline-block">
            CONTACT <span className="text-blue-600">AAROGYA SAPNA</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            We are here to help! Whether you have questions about our services,
            need support, or want to explore partnership opportunities, feel
            free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-3xl font-semibold text-slate-800 mb-8">
                Contact Information
              </h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-100 transition-all duration-300">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-slate-800 font-medium text-lg">
                      contact@aarogyasapna.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="bg-purple-50 p-4 rounded-2xl group-hover:bg-purple-100 transition-all duration-300">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="text-slate-800 font-medium text-lg">
                      +1 234 567 890
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="bg-pink-50 p-4 rounded-2xl group-hover:bg-pink-100 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-slate-800 font-medium text-lg">
                      Muzaffarpur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6"
          >
            {status.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                  <User size={16} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                  <MessageSquare size={16} /> Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                  <MessageSquare size={16} /> Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition font-medium flex items-center justify-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.loading ? (
                "Sending..."
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUS;
