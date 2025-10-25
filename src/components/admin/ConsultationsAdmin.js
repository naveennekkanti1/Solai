import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader, Calendar, Mail, Phone, FileText, Building, User, Eye, DollarSign, X } from 'lucide-react';

// Consultation Card Component
const ConsultationCard = ({ consultation, onDragStart, onClick }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, consultation)}
      onClick={() => onClick(consultation)}
      className="bg-white rounded-xl p-4 mb-3 shadow-md hover:shadow-xl transition-all duration-200 cursor-move border-l-4 border-blue-500 hover:scale-[1.02] active:scale-95"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building size={18} className="text-blue-600 flex-shrink-0" />
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{consultation.company_name || 'N/A'}</h3>
        </div>
        <Eye size={16} className="text-gray-400 flex-shrink-0" />
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <User size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 truncate">{consultation.contact_name || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 truncate">{consultation.contact_email || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-600">{consultation.contact_phone || 'N/A'}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <FileText size={12} className="text-purple-600" />
          <span className="text-xs text-gray-600 truncate">{consultation.service || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={12} className="text-green-600" />
          <span className="text-xs font-semibold text-green-700">{consultation.budget || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

// Status Column Component
const StatusColumn = ({ status, title, color, icon: Icon, consultations, onDragStart, onDragOver, onDrop, onConsultationClick }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 from-blue-500 to-blue-600',
    yellow: 'bg-yellow-50 border-yellow-200 from-yellow-500 to-orange-500',
    green: 'bg-green-50 border-green-200 from-green-500 to-emerald-600'
  };

  return (
    <div 
      className={`flex-1 min-w-[320px] md:min-w-[350px] ${colorClasses[color]} border-2 rounded-2xl p-4 transition-all duration-200`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className={`bg-gradient-to-r ${colorClasses[color]} text-white rounded-xl p-4 mb-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon size={24} />
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <span className="bg-white/30 backdrop-blur-sm text-white font-bold text-sm px-3 py-1 rounded-full">
            {consultations.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
        {consultations.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Icon size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No consultations</p>
          </div>
        ) : (
          consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
              onDragStart={onDragStart}
              onClick={onConsultationClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Detail Modal Component
const ConsultationDetailModal = ({ consultation, onClose }) => {
  if (!consultation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Consultation Details</h2>
            <p className="text-white/80 text-sm mt-1">View complete information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-500 rounded-lg">
                <Building className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Company Information</h3>
            </div>
            <p className="text-gray-900 font-semibold text-xl">{consultation.company_name || 'N/A'}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <User className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Contact Person</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500 uppercase">Name</span>
                <p className="text-gray-900 font-semibold text-lg mt-1">{consultation.contact_name || 'N/A'}</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-1" size={18} />
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase block">Email</span>
                  <a href={`mailto:${consultation.contact_email}`} className="text-blue-600 hover:text-blue-700 font-medium break-all">{consultation.contact_email || 'N/A'}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-blue-600 mt-1" size={18} />
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase block">Phone</span>
                  <a href={`tel:${consultation.contact_phone}`} className="text-blue-600 hover:text-blue-700 font-medium">{consultation.contact_phone || 'N/A'}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-purple-600" size={18} />
                <h3 className="font-bold text-gray-900">Service</h3>
              </div>
              <p className="text-gray-900 font-medium text-lg">{consultation.service || 'N/A'}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-green-600" size={18} />
                <h3 className="font-bold text-gray-900">Budget Range</h3>
              </div>
              <p className="text-gray-900 font-bold text-xl">{consultation.budget || 'N/A'}</p>
            </div>
          </div>

          {consultation.description && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <FileText className="text-white" size={18} />
                </div>
                <h3 className="font-bold text-gray-900">Project Description</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {consultation.description}
              </p>
            </div>
          )}

          {consultation.timeline && (
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-cyan-500 rounded-lg">
                  <Calendar className="text-white" size={18} />
                </div>
                <h3 className="font-bold text-gray-900">Timeline</h3>
              </div>
              <p className="text-gray-900 font-medium text-lg">{consultation.timeline}</p>
            </div>
          )}

          <div className="flex items-center justify-center pt-2">
            <div className={`px-6 py-3 rounded-full text-sm font-bold shadow-md ${
              consultation.status === 'received' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
              consultation.status === 'reviewing' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
              'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
            }`}>
              Status: {consultation.status ? consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1) : 'Unknown'}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 flex justify-end border-t">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ConsultationsAdmin = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://violent-stacey-solai-aba6a507.koyeb.app/consultation/all');
      const data = await response.json();
      
      const formattedData = (data || []).map(item => ({
        ...item,
        status: item.status || 'received'
      }));
      
      setConsultations(formattedData);
      showMessage('Consultations loaded successfully', 'success');
    } catch (error) {
      console.error('Error fetching consultations:', error);
      showMessage('Failed to fetch consultations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleDragStart = (e, consultation) => {
    setDraggedItem(consultation);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    try {
      const response = await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/consultation/update-status/${draggedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setConsultations(prev => 
          prev.map(c => 
            c.id === draggedItem.id ? { ...c, status: newStatus } : c
          )
        );
        showMessage(`Consultation moved to ${newStatus}`, 'success');
      } else {
        showMessage('Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showMessage('Failed to update status', 'error');
    }

    setDraggedItem(null);
  };

  const getConsultationsByStatus = (status) => {
    return consultations.filter(c => c.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="text-red-600" size={36} />
                Consultations Management
              </h1>
              <p className="text-gray-600 mt-2">Drag and drop consultations to change their status</p>
            </div>
            <button
              onClick={fetchConsultations}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
            >
              <Loader size={20} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 shadow-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <Loader size={48} className="animate-spin mx-auto text-red-600" />
            <p className="text-gray-600 mt-4 font-medium">Loading consultations...</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            <StatusColumn 
              status="received" 
              title="Received" 
              color="blue"
              icon={Mail}
              consultations={getConsultationsByStatus('received')}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onConsultationClick={setSelectedConsultation}
            />
            <StatusColumn 
              status="reviewing" 
              title="Under Review" 
              color="yellow"
              icon={FileText}
              consultations={getConsultationsByStatus('reviewing')}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onConsultationClick={setSelectedConsultation}
            />
            <StatusColumn 
              status="contacted" 
              title="Contacted" 
              color="green"
              icon={Phone}
              consultations={getConsultationsByStatus('contacted')}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onConsultationClick={setSelectedConsultation}
            />
          </div>
        )}

        {selectedConsultation && (
          <ConsultationDetailModal 
            consultation={selectedConsultation}
            onClose={() => setSelectedConsultation(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationsAdmin;