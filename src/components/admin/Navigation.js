// components/admin/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Calendar, LogOut, User, Briefcase } from 'lucide-react';

const Navigation = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">SolAI Admin</h1>

            <div className="flex gap-2">
              {/* Newsletter */}
              <button
                onClick={() => navigate('/admin/newsletter')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/newsletter')
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Mail size={18} className="inline mr-2" />
                Newsletter
              </button>

              {/* Consultations */}
              <button
                onClick={() => navigate('/admin/consultations')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/consultations')
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar size={18} className="inline mr-2" />
                Consultations
              </button>

              {/* Forms */}
              <button
                onClick={() => navigate('/admin/forms')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/forms')
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar size={18} className="inline mr-2" />
                Forms
              </button>
              <button
                onClick={() => navigate('/admin/job-post')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/job-post')
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase size={18} className="inline mr-2" />
                Job Post
              </button>

            </div>
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={18} />
                <span className="font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
