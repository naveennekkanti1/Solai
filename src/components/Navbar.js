import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm rounded-full max-w-6xl mx-auto mt-6">
      <div className="text-red-700 text-xl font-semibold">
        <Link to="/">SolAi</Link>
      </div>

      <ul className="flex space-x-8 text-gray-700 font-medium">
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

      <button
        onClick={() => window.location.href = "/contact"}
        className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;
