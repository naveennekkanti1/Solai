import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Save, Plus, Trash2, GripVertical, Settings, 
  FileText, Calendar, Eye, EyeOff, RotateCcw, Edit3,
  AlertCircle, CheckCircle, ArrowLeft
} from "lucide-react";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  
  // Form Settings
  const [deadline, setDeadline] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [allowMultipleResponses, setAllowMultipleResponses] = useState(false);
  const [editAfterSubmit, setEditAfterSubmit] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const form = data.form || data;

        setTitle(form.title || "");
        setDescription(form.description || "");
        setFields(form.fields || []);

        // Load form settings
        if (form.formsettings) {
          setDeadline(form.formsettings.deadline || "");
          setIsPublic(form.formsettings.ispublic !== false);
          setAllowMultipleResponses(form.formsettings.allowedMultipleResponses || false);
          setEditAfterSubmit(form.formsettings.editAfterSubmit || false);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load form");
        setLoading(false);
      });
  }, [id]);

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const updateOptions = (index, value) => {
    const updated = [...fields];
    updated[index].options = value.split(",").map((o) => o.trim()).filter(o => o);
    setFields(updated);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        fieldId: Date.now().toString(),
        label: "",
        fieldType: "TEXT",
        options: [],
        required: false
      }
    ]);
  };

  const removeField = (index) => {
    if (window.confirm("Are you sure you want to remove this field?")) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const moveField = (index, direction) => {
    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < fields.length) {
      [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
      setFields(newFields);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Please enter a form title");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].label.trim()) {
        alert(`Please enter a label for field ${i + 1}`);
        return;
      }
      if (fields[i].fieldType === "OPTIONS" && fields[i].options.length === 0) {
        alert(`Please add options for field "${fields[i].label}"`);
        return;
      }
    }

    setSaving(true);

    const payload = {
      title,
      description,
      fields,
      formsettings: {
        deadline: deadline || null,
        ispublic: isPublic,
        allowedMultipleResponses: allowMultipleResponses,
        editAfterSubmit: editAfterSubmit
      }
    };

    try {
      const response = await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Form Updated Successfully!");
        // Optionally navigate back or refresh
      } else {
        throw new Error("Failed to update form");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating form. Please try again.");
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Form</h1>
                <p className="text-gray-600">Update your form details and settings</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                showSettings 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500'
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Form Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter form title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Enter form description (optional)"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Form Settings</h2>
              </div>

              <div className="space-y-6">
                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for no deadline
                  </p>
                </div>

                {/* Toggle Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      {isPublic ? (
                        <Eye className="w-5 h-5 text-green-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-orange-600" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">Public Form</p>
                        <p className="text-xs text-gray-600">Anyone can access</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Multiple Responses</p>
                        <p className="text-xs text-gray-600">Allow resubmission</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowMultipleResponses}
                        onChange={(e) => setAllowMultipleResponses(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 md:col-span-2">
                    <div className="flex items-center gap-3">
                      <Edit3 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Edit After Submit</p>
                        <p className="text-xs text-gray-600">Users can modify their responses</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editAfterSubmit}
                        onChange={(e) => setEditAfterSubmit(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Form Fields</h2>
                  <p className="text-sm text-gray-600">{fields.length} field{fields.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addField}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Add Field
              </button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">No fields added yet</p>
                <p className="text-gray-500 text-sm">Click "Add Field" to create your first question</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.fieldId || index}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Drag Handle & Number */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => moveField(index, "up")}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => moveField(index, "down")}
                            disabled={index === fields.length - 1}
                            className={`p-1 rounded ${
                              index === fields.length - 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Field Content */}
                      <div className="flex-1 space-y-4">
                        {/* Label */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Question Label <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(index, "label", e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter question"
                            required
                          />
                        </div>

                        {/* Field Type */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Field Type
                          </label>
                          <select
                            value={field.fieldType}
                            onChange={(e) => updateField(index, "fieldType", e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                          >
                            <option value="TEXT">Short Text</option>
                            <option value="EMAIL">Email</option>
                            <option value="OPTIONS">Multiple Choice</option>
                            <option value="FILE_UPLOAD">File Upload</option>
                          </select>
                        </div>

                        {/* Options for dropdown */}
                        {field.fieldType === "OPTIONS" && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Options (comma separated) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={field.options.join(", ")}
                              onChange={(e) => updateOptions(index, e.target.value)}
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="e.g., Option 1, Option 2, Option 3"
                              required
                            />
                            {field.options.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.options.map((opt, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                  >
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Required Checkbox */}
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                          <input
                            type="checkbox"
                            id={`required-${index}`}
                            checked={field.required}
                            onChange={(e) => updateField(index, "required", e.target.checked)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`required-${index}`}
                            className="text-sm font-semibold text-gray-700 cursor-pointer"
                          >
                            Required field
                          </label>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => removeField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete field"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-300 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Form
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;