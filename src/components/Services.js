import React from "react";
import { Code, Brain, MessageSquare, Heart, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const navigate = useNavigate();
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Custom Website Development",
      description: "Build responsive, scalable, and modern websites tailored to your business needs. From landing pages to complex web applications, we deliver solutions that drive results.",
      features: [
        "Responsive Design",
        "Modern Frameworks",
        "SEO Optimized",
        "Fast Performance"
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI Powered Solutions",
      description: "Leverage the power of artificial intelligence to automate processes, gain insights, and enhance decision-making. Our AI solutions are designed to transform your business operations.",
      features: [
        "Machine Learning Models",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision"
      ]
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Chatbots",
      description: "Intelligent chatbot solutions that provide 24/7 customer support, automate responses, and improve user engagement. Enhance your customer service with AI-driven conversations.",
      features: [
        "24/7 Availability",
        "Multi-language Support",
        "AI-Powered Responses",
        "Easy Integration"
      ]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Medical Solutions in Technology",
      description: "Specialized healthcare technology solutions including patient management systems, telemedicine platforms, and medical data analytics to improve healthcare delivery.",
      features: [
        "HIPAA Compliant",
        "Patient Management",
        "Telemedicine Integration",
        "Medical Analytics"
      ]
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Support and Maintenance Projects",
      description: "Comprehensive support and maintenance services to keep your systems running smoothly. We provide ongoing updates, bug fixes, and technical support for your digital infrastructure.",
      features: [
        "24/7 Monitoring",
        "Regular Updates",
        "Bug Fixes",
        "Technical Support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Comprehensive technology solutions designed to elevate your business
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="bg-red-100 text-red-600 w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-red-100 mb-8">
            Let's discuss how our services can help transform your business
          </p>
          <button 
            onClick={() => navigate('/contact')}
          className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Request Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;