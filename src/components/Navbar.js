import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm rounded-full max-w-6xl mx-auto mt-6 px-4 sm:px-8">
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-red-700 text-xl font-semibold">
          <Link to="/">SolAi</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-red-600">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-red-600">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-red-600">
            <Link to="/services">Services</Link>
          </li>
          <li className="cursor-pointer hover:text-red-600">
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li className="cursor-pointer hover:text-red-600">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop CTA Button */}
        <button
          onClick={() => window.location.href = "/contact"}
          className="hidden md:block bg-gradient-to-r from-red-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pb-4">
          <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-red-600">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-red-600">
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </li>
            <li className="cursor-pointer hover:text-red-600">
              <Link to="/services" onClick={toggleMenu}>Services</Link>
            </li>
            <li className="cursor-pointer hover:text-red-600">
              <Link to="/portfolio" onClick={toggleMenu}>Portfolio</Link>
            </li>
            <li className="cursor-pointer hover:text-red-600">
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </li>
          </ul>
          <button
            onClick={() => window.location.href = "/contact"}
            className="mt-4 w-full bg-gradient-to-r from-red-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;