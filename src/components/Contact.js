import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, Calendar } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    serviceInterestedIn: "",
    budgetRange: "",
    projectDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const services = [
    "Custom Website Development",
    "AI Powered Solutions",
    "Chatbots",
    "Medical Solutions in Technology",
    "Support and Maintenance Projects",
  ];

  const budgetRanges = ["₹1k - ₹10k", "₹11k - ₹100k", "₹1L - ₹5L", "₹5L++"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.companyName) tempErrors.companyName = "Company Name is required.";
    if (!formData.contactPersonName) tempErrors.contactPersonName = "Name is required.";
    if (!formData.contactPersonEmail) tempErrors.contactPersonEmail = "Email is required.";
    if (!formData.contactPersonPhone) tempErrors.contactPersonPhone = "Phone is required.";
    if (!formData.serviceInterestedIn) tempErrors.serviceInterestedIn = "Select a service.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showPopup("Please fill all required fields.", "error");
      return;
    }

    // Backend expects an ARRAY, not a single object
    const payload = {
  companyName: formData.companyName,
  contactPersonName: formData.contactPersonName,
  contactPersonEmail: formData.contactPersonEmail,
  contactPersonPhone: formData.contactPersonPhone,
  serviceInterestedIn: formData.serviceInterestedIn || "Not Specified",
  budgetRange: formData.budgetRange || "Not Specified",
  projectDescription: formData.projectDescription || "",
};


    try {
      setLoading(true);
      await axios.post(
        "https://violent-stacey-solai-aba6a507.koyeb.app/consultation/request",
        payload, // <-- ARRAY
        { headers: { "Content-Type": "application/json" } }
      );
      setLoading(false);
      showPopup("Consultation request submitted successfully!", "success");

      setFormData({
        companyName: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonPhone: "",
        serviceInterestedIn: "",
        budgetRange: "",
        projectDescription: "",
      });
      setErrors({});
    } catch (error) {
      setLoading(false);
      console.error("Axios error:", error.response?.data || error.message);
      showPopup("Failed to submit the request. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {popup.message && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded shadow-lg text-white z-50 ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popup.message}
        </div>
      )}

      <div className="bg-red-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Request Consultation</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Request a Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Your Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-md ${
                        errors.companyName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPersonName"
                      placeholder="Your Full Name"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-md ${
                        errors.contactPersonName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.contactPersonName && (
                      <p className="text-red-500 text-xs mt-1">{errors.contactPersonName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactPersonEmail"
                      placeholder="your@email.com"
                      value={formData.contactPersonEmail}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-md ${
                        errors.contactPersonEmail ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.contactPersonEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.contactPersonEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPersonPhone"
                      placeholder="+91 9876543210"
                      value={formData.contactPersonPhone}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-md ${
                        errors.contactPersonPhone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.contactPersonPhone && (
                      <p className="text-red-500 text-xs mt-1">{errors.contactPersonPhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="serviceInterestedIn"
                      value={formData.serviceInterestedIn}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-md bg-white ${
                        errors.serviceInterestedIn ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterestedIn && (
                      <p className="text-red-500 text-xs mt-1">{errors.serviceInterestedIn}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-md bg-white"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((budget, index) => (
                        <option key={index} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="projectDescription"
                    placeholder="Describe your project..."
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-md resize-none"
                    rows="6"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-red-600 text-white px-6 py-3 rounded-md font-semibold ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 text-sm mb-8">
                We're here to help and answer any question you might have.
              </p>

              <div className="mb-8">
                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                    <a
                      href="mailto:aisolcontact@zohomail.in"
                      className="text-red-600 text-sm hover:underline"
                    >
                      aisolcontact@zohomail.in
                    </a>
                    <p className="text-gray-500 text-xs mt-1">Send us an email anytime</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Call Us</h4>
                    <p className="text-gray-600 text-sm">Anytime Available</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-lg mb-4">
                    <Calendar className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Ready to get started?</h4>
                  <p className="text-gray-600 text-sm">
                    Schedule a free consultation with our AI experts today.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
