// components/admin/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import NewsletterAdmin from './NewsletterAdmin';
import ConsultationsAdmin from './ConsultationsAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/newsletter" replace />} />
        <Route path="/newsletter" element={<NewsletterAdmin />} />
        <Route path="/consultations" element={<ConsultationsAdmin />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;