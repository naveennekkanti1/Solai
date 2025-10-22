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

  const services = [
    "Custom Website Development",
    "AI Powered Solutions",
    "Chatbots",
    "Medical Solutions in Technology",
    "Support and Maintenance Projects"
  ];

  const budgetRanges = [
    "₹1k - ₹10k",
    "₹11k - ₹100k",
    "₹1L - ₹5L",
    "₹5L++"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/consultation/request", formData);
      alert("Consultation request submitted successfully!");
      setFormData({
        companyName: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonPhone: "",
        serviceInterestedIn: "",
        budgetRange: "",
        projectDescription: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit the request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Request Consultation</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Request a Consultation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Company Name and Contact Person Name */}
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
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      required
                    />
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
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactPersonEmail"
                      placeholder="your@email.com"
                      value={formData.contactPersonEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      required
                    />
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
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Service and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="serviceInterestedIn"
                      value={formData.serviceInterestedIn}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white appearance-none"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white appearance-none"
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

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="projectDescription"
                    placeholder="Describe your project, challenges, and goals..."
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
                    rows="6"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 text-sm mb-8">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>

              {/* Email Section */}
              <div className="mb-8">
                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                    <a href="mailto:hello.realsol@gmail.com" className="text-red-600 text-sm hover:underline">
                      aisolcontact@zohomail.in
                    </a>
                    <p className="text-gray-500 text-xs mt-1">Send us an email anytime</p>
                  </div>
                </div>
              </div>

              {/* Call Section */}
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

              {/* Ready to Get Started Section */}
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