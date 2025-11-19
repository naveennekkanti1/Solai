import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Send, Eye, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";

const FormPreview = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("Form ID from URL:", formId);
    if (formId) {
      fetchFormData();
    } else {
      setError("No form ID provided in URL");
      setLoading(false);
    }
  }, [formId]);

  const fetchFormData = async () => {
    try {
      console.log("Fetching form with ID:", formId);
      const res = await axios.get(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${formId}`);
      console.log("Form data received:", res.data); // Debug log
      console.log("Fields received:", res.data.fields); // Debug fields specifically
      
      // Log each field type
      res.data.fields.forEach((field, idx) => {
        console.log(`Field ${idx}:`, {
          label: field.label,
          fieldType: field.fieldType,
          type: field.type,
          rawField: field
        });
      });
      
      setFormData(res.data);
      setLoading(false);
      
      // Initialize responses with empty values
      const initialResponses = {};
      res.data.fields.forEach((field, index) => {
        const fieldKey = field.label || `field_${index}`;
        initialResponses[fieldKey] = "";
      });
      setResponses(initialResponses);
    } catch (err) {
      console.error(err);
      setError("Failed to load form. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (fieldLabel, value) => {
    setResponses({
      ...responses,
      [fieldLabel]: value,
    });
  };

  const validateForm = () => {
    for (let i = 0; i < formData.fields.length; i++) {
      const field = formData.fields[i];
      const fieldKey = field.label || `field_${i}`;
      const response = responses[fieldKey];
      
      if (field.required) {
        if (!response || response === "") {
          alert(`Please fill in the required field: ${field.label || `Question ${i + 1}`}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Convert responses object to array format for backend
    const responsesArray = Object.keys(responses).map(key => ({
      question: key,
      answer: responses[key]
    }));

    const payload = {
      formId: formId,
      answers: responsesArray,
      submittedAt: Date.now(),
    };

    console.log("Submitting payload:", payload); // Debug log

    try {
      const response = await axios.post(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/submit`, payload);
      console.log("Submit response:", response.data); // Debug log
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMessage = "Error submitting form";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Show detailed error for debugging
      alert(`${errorMessage}\n\nPlease check the console for more details.`);
      setSubmitting(false);
    }
  };

  const renderField = (field, index) => {
    const fieldLabel = field.label || `Question ${index + 1}`;
    // Use fieldType from backend and normalize to uppercase
    const fieldType = field.fieldType?.toUpperCase() || field.type?.toUpperCase();

    console.log(`Rendering field ${index}:`, { fieldLabel, fieldType, field }); // Debug log

    switch (fieldType) {
      case "TEXT":
        return (
          <input
            type="text"
            value={responses[fieldLabel] || ""}
            onChange={(e) => handleInputChange(fieldLabel, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your answer"
            required={field.required}
          />
        );

      case "EMAIL":
        return (
          <input
            type="email"
            value={responses[fieldLabel] || ""}
            onChange={(e) => handleInputChange(fieldLabel, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your email"
            required={field.required}
          />
        );

      case "OPTIONS":
        return (
          <select
            value={responses[fieldLabel] || ""}
            onChange={(e) => handleInputChange(fieldLabel, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options && field.options.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "FILE_UPLOAD":
        return (
          <div>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleInputChange(fieldLabel, file.name);
                }
              }}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={field.required}
            />
            <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 font-semibold">
              Unsupported field type: {fieldType || "null"}
            </p>
            <p className="text-red-600 text-sm mt-1">
              Please contact the form administrator to fix this field.
            </p>
            {field.options && field.options.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Available options:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {field.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
    }
  };

  const getFieldTypeDisplay = (fieldType, field) => {
    const type = fieldType?.toUpperCase();
    const typeMap = {
      'TEXT': 'Short answer',
      'EMAIL': 'Email',
      'OPTIONS': 'Multiple choice',
      'FILE_UPLOAD': 'File upload'
    };
    
    // If fieldType is null but options exist, assume it's OPTIONS
    if (!type && field?.options && field.options.length > 0) {
      return 'Multiple choice (missing type)';
    }
    
    return typeMap[type] || (type ? `Unknown (${type})` : 'Unknown type');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Form Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your response. Your submission has been recorded successfully.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isDeadlinePassed = formData.formsettings?.deadline && 
    new Date(formData.formsettings.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{formData.title}</h1>
                {!formData.formsettings?.ispublic && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                    Private
                  </span>
                )}
              </div>
              {formData.description && (
                <p className="text-gray-600 text-lg">{formData.description}</p>
              )}
            </div>
          </div>

          {/* Form Info */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            {formData.formsettings?.deadline && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className={`text-sm font-medium ${isDeadlinePassed ? 'text-red-600' : 'text-gray-700'}`}>
                  Deadline: {new Date(formData.formsettings.deadline).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {formData.fields.length} {formData.fields.length === 1 ? 'Question' : 'Questions'}
              </span>
            </div>
          </div>

          {isDeadlinePassed && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-700 font-semibold text-center">
                This form has passed its deadline and is no longer accepting responses.
              </p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        {!isDeadlinePassed && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.fields.map((field, index) => {
              const fieldLabel = field.label || `Question ${index + 1}`;
              const fieldType = field.fieldType || field.type;
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="mb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-md flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <label className="block text-lg font-semibold text-gray-900 mb-1">
                          {fieldLabel}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <p className="text-sm text-gray-500">
                          {getFieldTypeDisplay(fieldType, field)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {renderField(field, index)}
                </div>
              );
            })}

            {/* Submit Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-semibold ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Response
                  </>
                )}
              </button>

              {/* Form Settings Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  {formData.formsettings?.allowedMultipleResponses && (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Multiple responses allowed
                    </span>
                  )}
                  {formData.formsettings?.editAfterSubmit && (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Can edit after submission
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormPreview;