// components/admin/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import NewsletterAdmin from './NewsletterAdmin';
import ConsultationsAdmin from './ConsultationsAdmin';
import FormManager from './FormManager';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import SubmitResponse from './Submitresponse';
import FormResponsesViewer from './FormResponsesViewer';
import AdminJobPost from './AdminJobPost';
import WifiCheck from './WifiCheck'; // adjust path based on folder structure

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <WifiCheck>
      <div className="min-h-screen bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/admin/newsletter" replace />} />
          <Route path="/newsletter" element={<NewsletterAdmin />} />
          <Route path="/consultations" element={<ConsultationsAdmin />} />
          <Route path="/forms" element={<FormManager />} />
          <Route path="/forms/create" element={<CreateForm />} />
          <Route path="/forms/edit/:id" element={<EditForm />} />
          <Route path="/forms/:id" element={<SubmitResponse />} />
          <Route path="/forms/responses/:formId" element={<FormResponsesViewer />} />
          <Route path="/job-post" element={<AdminJobPost />} />
        </Routes>
      </div>
    </WifiCheck>
  );
};

export default AdminDashboard;
