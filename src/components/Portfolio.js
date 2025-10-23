import React, { useState } from "react";
import { ExternalLink, Code, Brain, MessageSquare, Heart, Wrench, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A full-featured online shopping platform with payment integration, inventory management, and responsive design.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      icon: <Code className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 2,
      title: "AI Predictive Analytics Tool",
      category: "AI Solutions",
      description: "Machine learning model that predicts customer behavior and provides actionable business insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["Python", "TensorFlow", "Data Science", "API"],
      icon: <Brain className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 3,
      title: "Customer Support Chatbot",
      category: "Chatbots",
      description: "Intelligent chatbot with natural language processing for 24/7 customer service automation.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      tags: ["NLP", "DialogFlow", "React", "WebSocket"],
      icon: <MessageSquare className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 4,
      title: "Telemedicine Platform",
      category: "Medical Tech",
      description: "HIPAA-compliant platform for virtual consultations, patient records, and appointment scheduling.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      tags: ["HIPAA", "Video Call", "React", "Security"],
      icon: <Heart className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 5,
      title: "Corporate Website Redesign",
      category: "Web Development",
      description: "Modern, SEO-optimized corporate website with dynamic content management and analytics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["Next.js", "SEO", "CMS", "Analytics"],
      icon: <Globe className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 6,
      title: "Inventory Management System",
      category: "Maintenance",
      description: "Real-time inventory tracking with automated alerts, reporting, and multi-location support.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      tags: ["Dashboard", "Real-time", "PostgreSQL", "REST API"],
      icon: <Wrench className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 7,
      title: "AI Image Recognition App",
      category: "AI Solutions",
      description: "Computer vision application for automated quality control in manufacturing processes.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      tags: ["Computer Vision", "PyTorch", "Flask", "Docker"],
      icon: <Brain className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 8,
      title: "Healthcare Appointment Bot",
      category: "Chatbots",
      description: "Automated appointment scheduling and reminder system for healthcare providers.",
      image: "https://acropolium.com/img/articles/chatbots-in-healthcare/img01.jpg",
      tags: ["Automation", "SMS", "Calendar API", "Node.js"],
      icon: <MessageSquare className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 9,
      title: "Patient Portal System",
      category: "Medical Tech",
      description: "Secure patient portal for accessing medical records, lab results, and communication with doctors.",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop",
      tags: ["Security", "Portal", "Healthcare", "Encryption"],
      icon: <Heart className="w-6 h-6" />,
      link: "#"
    }
  ];

  const categories = ["All", "Web Development", "AI Solutions", "Chatbots", "Medical Tech", "Maintenance"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Explore our successful projects and see how we've helped businesses transform digitally
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
                  <div className="text-red-600">
                    {project.icon}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-sm text-red-600 font-semibold mb-2">
                  {project.category}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-red-100 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-red-100">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <div className="text-red-100">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-red-100">Industries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-red-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-red-100 mb-8">
            Let's create something amazing together. Get in touch with us today
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Your Project
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-4">SolAi</h3>
              <p className="text-gray-400 text-sm">
                Transforming businesses through innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Home</li>
                <li className="hover:text-white cursor-pointer" onClick={() => navigate('/about')}>About</li>
                <li className="hover:text-white cursor-pointer" onClick={() => navigate('/services')}>Services</li>
                <li className="hover:text-white cursor-pointer" onClick={() => navigate('/portfolio')}>Portfolio</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Web Development</li>
                <li className="hover:text-white cursor-pointer">AI Solutions</li>
                <li className="hover:text-white cursor-pointer">Chatbots</li>
                <li className="hover:text-white cursor-pointer">Medical Tech</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: solaicontact@zohomail.in</li>
                <li>Phone: +91 8919386831</li>
                <li className="hover:text-white cursor-pointer" onClick={() => navigate('/contact')}>Contact Form</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 SolAi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;