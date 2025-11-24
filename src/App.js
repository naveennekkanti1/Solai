// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import UnsubscribeComponent from "./components/UnsubscribeComponent";
import ConsultationMeeting from "./components/ConsultationMeeting";
import LoginPage from "./components/admin/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import FormPreview from "./components/FormPreview";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
              </>
            }
          />
          <Route
            path="/portfolio"
            element={
              <>
                <Navbar />
                <Portfolio />
              </>
            }
          />
          <Route path="/form/:formId/preview" element={<FormPreview />} />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          <Route
            path="/unsubscribe"
            element={
              <>
                <Navbar />
                <UnsubscribeComponent />
              </>
            }
          />
          <Route
            path="/consultationmeeting"
            element={
              <>
                <Navbar />
                <ConsultationMeeting />
              </>
            }
          />
          <Route path="/jobs" element={
            <>
              <Navbar />
              <JobList />
            </>
          } />
          <Route path="/jobs/:jobId" element={
            <>
              <Navbar />
              <JobDetails />
            </>
          } />

          {/* Admin Routes - No Navbar */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect old newsletter route to admin */}
          <Route path="/newsletter" element={<Navigate to="/admin/newsletter" replace />} />

          {/* 404 Page */}
          <Route
  path="*"
  element={
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition inline-block"
          >
            Go Home
          </a>
        </div>
      </div>
    </>
  }
/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;