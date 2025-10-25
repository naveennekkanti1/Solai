// components/StatusColumn.jsx
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const StatusColumn = ({ 
  status, 
  title, 
  color, 
  icon: Icon, 
  consultations,
  onDragStart,
  onDragOver,
  onDrop,
  onConsultationClick
}) => {
  const colorClasses = {
    blue: {bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      badge: 'bg-blue-600',
      cardBorder: 'border-blue-500'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      badge: 'bg-yellow-600',
      cardBorder: 'border-yellow-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      badge: 'bg-green-600',
      cardBorder: 'border-green-500'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="flex-1 min-w-80">
      <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Icon className={colors.text} size={20} />
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span className={`ml-auto ${colors.badge} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
            {consultations.length}
          </span>
        </div>

        <div
          className="space-y-3 min-h-96"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, status)}
        >
          {consultations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No consultations</p>
            </div>
          ) : (
            consultations.map((consultation) => (
              <div
                key={consultation.id}
                draggable
                onDragStart={(e) => onDragStart(e, consultation)}
                onClick={() => onConsultationClick(consultation)}
                className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-move border-l-4 ${colors.cardBorder}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{consultation.companyName}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{consultation.contactPersonName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={14} />
                  <span className="truncate">{consultation.contactPersonEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Phone size={14} />
                  <span>{consultation.contactPersonPhone}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs font-medium text-gray-700">
                    {consultation.serviceInterestedIn}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusColumn;