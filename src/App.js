import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Services from "./components/Services";
import NewsletterAdmin from "./components/NewsletterAdmin";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter" element={<NewsletterAdmin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
