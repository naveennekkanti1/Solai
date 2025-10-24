import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Linkedin, Twitter, Youtube, Instagram, Send } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  // Phrases to loop through
  const phrases = [
    "Adding Intelligence to the Customer",
    "Build the Solutions with AI",
    "Launch Digital Solutions Fast"
  ];

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 80; // ms per character
  const deletingSpeed = 40; // ms per character when deleting
  const pauseTime = 1000; // pause after typing a phrase

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentPhrase.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8082/newsletter/subscribe?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        if (data.message && (data.message.toLowerCase().includes('already') || data.message.toLowerCase().includes('exist'))) {
          setMessage('This email is already registered!');
        } else {
          setMessage(data.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          {text}
          <span className="border-r-4 border-gray-400 animate-pulse ml-1"></span>
        </h1>
        <p className="text-gray-600 mt-6 text-lg max-w-2xl">
          Cutting-edge AI solutions for automation, analytics, and business
          transformation that drive innovation and growth.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => navigate("/services")}
            className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Explore Services
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="border border-gray-300 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-semibold mb-5">SolAi</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Empowering businesses through innovative AI solutions that drive growth, 
                efficiency, and competitive advantage in the digital age.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 bg-[#2a3142] hover:bg-red-600 rounded flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-[#2a3142] hover:bg-red-600 rounded flex items-center justify-center transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-[#2a3142] hover:bg-red-600 rounded flex items-center justify-center transition-colors" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-[#2a3142] hover:bg-red-600 rounded flex items-center justify-center transition-colors" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-400 leading-relaxed">
                    24th Main Road, HSR Layout, Bengaluru, Karnataka, 560012.
                  </span>
                </div>
                <div className="flex gap-3">
                  <Mail size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-400">solaicontact@zohomail.in</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-5">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">
                Stay updated with the latest in AI technology and business solutions.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
                {message && (
                  <p className={`text-sm ${message.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-[#2a3142] text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SolAi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Hero;
