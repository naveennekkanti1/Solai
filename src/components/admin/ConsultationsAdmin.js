// components/ConsultationsAdmin.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader, Calendar, Mail, Phone, Building, DollarSign, FileText, X } from 'lucide-react';
import StatusColumn from './StatusColumn';
import ConsultationDetailModal from './ConsultationDetailModal';

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
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="text-red-600" size={32} />
                Consultations Management
              </h1>
              <p className="text-gray-600 mt-2">Drag and drop consultations to change their status</p>
            </div>
            <button
              onClick={fetchConsultations}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <Loader size={20} className={loading ? 'animate-spin inline mr-2' : 'inline mr-2'} />
              Refresh
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <Loader size={48} className="animate-spin mx-auto text-red-600" />
            <p className="text-gray-600 mt-4">Loading consultations...</p>
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