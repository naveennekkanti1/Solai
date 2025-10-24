import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Services from "./components/Services";
import NewsletterAdmin from "./components/NewsletterAdmin";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import UnsubscribeComponent from "./components/UnsubscribeComponent";
import ConsultationMeeting from "./components/ConsultationMeeting";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter" element={<NewsletterAdmin/>}/>
          <Route path="/unsubscribe" element={<UnsubscribeComponent/>}/>
          <Route path="/consultationmeeting" element={<ConsultationMeeting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
