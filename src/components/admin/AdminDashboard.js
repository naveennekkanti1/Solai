// AdminDashboard.js

import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navigation from "./Navigation";
import NewsletterAdmin from "./NewsletterAdmin";
import ConsultationsAdmin from "./ConsultationsAdmin";
import FormManager from "./FormManager";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import SubmitResponse from "./Submitresponse";
import FormResponsesViewer from "./FormResponsesViewer";
import AdminJobPost from "./AdminJobPost";
import FormAccessManager from "./FormAccessManager";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Admin Navigation */}
      <Navigation onLogout={handleLogout} />

      {/* Admin Pages */}
      <Routes>

        {/* =====================================================
            DEFAULT ADMIN PAGE
            ===================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/admin/newsletter"
              replace
            />
          }
        />

        {/* =====================================================
            NEWSLETTER
            ===================================================== */}

        <Route
          path="/newsletter"
          element={<NewsletterAdmin />}
        />

        {/* =====================================================
            CONSULTATIONS
            ===================================================== */}

        <Route
          path="/consultations"
          element={<ConsultationsAdmin />}
        />

        {/* =====================================================
            FORMS
            ===================================================== */}

        <Route
          path="/forms"
          element={<FormManager />}
        />

        {/* =====================================================
            CREATE FORM
            ===================================================== */}

        <Route
          path="/forms/create"
          element={<CreateForm />}
        />

        {/* =====================================================
            EDIT FORM
            ===================================================== */}

        <Route
          path="/forms/edit/:id"
          element={<EditForm />}
        />

        {/* =====================================================
            SUBMIT RESPONSE
            ===================================================== */}

        <Route
          path="/forms/:id"
          element={<SubmitResponse />}
        />

        {/* =====================================================
            VIEW FORM RESPONSES
            ===================================================== */}

        <Route
          path="/forms/responses/:formId"
          element={<FormResponsesViewer />}
        />

        {/* =====================================================
            FORM ACCESS MANAGEMENT

            URL:
            /admin/forms/access/:formId

            Example:
            /admin/forms/access/6ab6a4e5072a643fefefd6b5
            ===================================================== */}

        <Route
          path="/forms/access/:formId"
          element={<FormAccessManager />}
        />

        {/* =====================================================
            JOB POST
            ===================================================== */}

        <Route
          path="/job-post"
          element={<AdminJobPost />}
        />

      </Routes>

    </div>
  );
};

export default AdminDashboard;