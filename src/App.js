// App.js

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Public components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import UnsubscribeComponent from "./components/UnsubscribeComponent";
import ConsultationMeeting from "./components/ConsultationMeeting";
import FormPreview from "./components/FormPreview";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

// Admin components
import LoginPage from "./components/admin/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";

// ---------------------------------------------------------
// Protected Route
// ---------------------------------------------------------
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");

    setIsAuthenticated(auth === "true");
    setIsLoading(false);
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// ---------------------------------------------------------
// App
// ---------------------------------------------------------
function App() {
  return (
    <Router>
      <div className="min-h-screen">

        <Routes>

          {/* =====================================================
              PUBLIC ROUTES
              ===================================================== */}

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
              </>
            }
          />

          {/* About */}
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />

          {/* Services */}
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
              </>
            }
          />

          {/* Portfolio */}
          <Route
            path="/portfolio"
            element={
              <>
                <Navbar />
                <Portfolio />
              </>
            }
          />

          {/* Form Preview */}
          <Route
            path="/form/:formId/preview"
            element={<FormPreview />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />

          {/* Unsubscribe */}
          <Route
            path="/unsubscribe"
            element={
              <>
                <Navbar />
                <UnsubscribeComponent />
              </>
            }
          />

          {/* Consultation Meeting */}
          <Route
            path="/consultationmeeting"
            element={
              <>
                <Navbar />
                <ConsultationMeeting />
              </>
            }
          />

          {/* =====================================================
              JOB ROUTES
              ===================================================== */}

          <Route
            path="/jobs"
            element={<JobList />}
          />

          <Route
            path="/jobs/:jobId"
            element={<JobDetails />}
          />

          {/* =====================================================
              ADMIN LOGIN
              ===================================================== */}

          <Route
            path="/admin/login"
            element={<LoginPage />}
          />

          {/* =====================================================
              ALL ADMIN ROUTES

              AdminDashboard handles:

              /admin/newsletter
              /admin/consultations
              /admin/forms
              /admin/forms/create
              /admin/forms/edit/:id
              /admin/forms/:id
              /admin/forms/responses/:formId
              /admin/forms/access/:formId
              /admin/job-post
              ===================================================== */}

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* =====================================================
              OLD NEWSLETTER ROUTE
              ===================================================== */}

          <Route
            path="/newsletter"
            element={
              <Navigate
                to="/admin/newsletter"
                replace
              />
            }
          />

          {/* =====================================================
              404 PAGE
              ===================================================== */}

          <Route
            path="*"
            element={
              <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

                  <div className="text-center">

                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                      404
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                      Page not found
                    </p>

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