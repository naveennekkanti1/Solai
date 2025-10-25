// components/ConsultationDetailModal.jsx
import React from 'react';
import { X, Building, User, Mail, Phone, DollarSign, FileText, Calendar } from 'lucide-react';

const ConsultationDetailModal = ({ consultation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-red-500 to-purple-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Consultation Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Company Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building className="text-red-600" size={20} />
              <h3 className="font-bold text-gray-900">Company Information</h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">Company Name:</span>
                <p className="text-gray-900 font-semibold">{consultation.companyName}</p>
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="text-red-600" size={20} />
              <h3 className="font-bold text-gray-900">Contact Person</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-gray-900 font-semibold">{consultation.contactPersonName}</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-500" size={16} />
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                </div>
                <p className="text-gray-900 ml-6">{consultation.contactPersonEmail}</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-500" size={16} />
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                </div>
                <p className="text-gray-900 ml-6">{consultation.contactPersonPhone}</p>
              </div>
            </div>
          </div>

          {/* Service & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-red-600" size={20} />
                <h3 className="font-bold text-gray-900">Service</h3>
              </div>
              <p className="text-gray-900">{consultation.serviceInterestedIn}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-red-600" size={20} />
                <h3 className="font-bold text-gray-900">Budget Range</h3>
              </div>
              <p className="text-gray-900 font-semibold">{consultation.budgetRange}</p>
            </div>
          </div>

          {/* Project Description */}
          {consultation.projectDescription && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-red-600" size={20} />
                <h3 className="font-bold text-gray-900">Project Description</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {consultation.projectDescription}
              </p>
            </div>
          )}

          {/* Timeline */}
          {consultation.timeline && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="text-red-600" size={20} />
                <h3 className="font-bold text-gray-900">Timeline</h3>
              </div>
              <p className="text-gray-900">{consultation.timeline}</p>
            </div>
          )}

          {/* Status Badge */}
          <div className="flex items-center justify-center pt-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              consultation.status === 'received' ? 'bg-blue-100 text-blue-800' :
              consultation.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              Status: {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-6 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailModal;