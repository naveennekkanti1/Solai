import React from "react";
import { Target, Users, Lightbulb, Award, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "Mission Driven",
      description: "We're committed to delivering innovative solutions that drive real business value and exceed expectations."
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Client Focused",
      description: "Your success is our priority. We build lasting partnerships through exceptional service and support."
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Innovation First",
      description: "We stay ahead of technology trends to provide cutting-edge solutions that keep you competitive."
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in every project, ensuring reliable and robust solutions."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const team = [
    {
      name: "Technical Excellence",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Our team consists of experienced developers, AI specialists, and technology consultants."
    },
    {
      name: "Security First",
      icon: <Shield className="w-8 h-8" />,
      description: "We prioritize data security and compliance in every solution we deliver."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About SolAi</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Transforming businesses through innovative technology solutions and AI-powered development
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              SolAi was founded with a vision to bridge the gap between cutting-edge technology and practical business solutions. We believe that every organization, regardless of size, should have access to powerful AI and web technologies that drive growth and efficiency.
            </p>
            <p>
              Our journey began with a simple mission: to create digital solutions that not only meet technical requirements but also deliver tangible business value. Today, we're proud to serve clients across various industries, helping them leverage the power of modern technology.
            </p>
            <p>
              From custom website development to sophisticated AI implementations, we combine technical expertise with a deep understanding of business needs. Our team is passionate about innovation, committed to quality, and dedicated to your success.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-red-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center"
            >
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expertise and dedication that sets us apart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-xl text-red-100 mb-8">
            Ready to start your next project? We'd love to hear from you
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Get In Touch
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
                <li>Email: aisolcontact@zohomail.in</li>
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

export default About;