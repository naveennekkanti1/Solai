import React from 'react';
import { X, Building, User, Mail, Phone, DollarSign, FileText, Calendar } from 'lucide-react';

const ConsultationDetailModal = ({ consultation, onClose }) => {
  if (!consultation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Company Information */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-500 rounded-lg">
                <Building className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Company Information</h3>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Company Name</span>
              <p className="text-gray-900 font-semibold text-xl mt-1">{consultation.company_name || 'N/A'}</p>
            </div>
          </div>

          {/* Contact Person */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <User className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Contact Person</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Name</span>
                <p className="text-gray-900 font-semibold text-lg mt-1">{consultation.contact_name || 'N/A'}</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block">Email</span>
                  <a href={`mailto:${consultation.contact_email}`} className="text-blue-600 hover:text-blue-700 font-medium break-all">{consultation.contact_email || 'N/A'}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block">Phone</span>
                  <a href={`tel:${consultation.contact_phone}`} className="text-blue-600 hover:text-blue-700 font-medium">{consultation.contact_phone || 'N/A'}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Service & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <FileText className="text-white" size={18} />
                </div>
                <h3 className="font-bold text-gray-900">Service</h3>
              </div>
              <p className="text-gray-900 font-medium text-lg">{consultation.service || 'N/A'}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="text-white" size={18} />
                </div>
                <h3 className="font-bold text-gray-900">Budget Range</h3>
              </div>
              <p className="text-gray-900 font-bold text-xl">{consultation.budget || 'N/A'}</p>
            </div>
          </div>

          {/* Project Description */}
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

          {/* Timeline */}
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

          {/* Status Badge */}
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

        {/* Footer */}
        <div className="bg-gray-50 p-5 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailModal;