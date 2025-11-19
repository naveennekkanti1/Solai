import React, { useState } from "react";
import axios from "axios";
import { Plus, X, Save, Settings, FileText, Type, AlignLeft, CheckSquare, Circle, List, Calendar } from "lucide-react";

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [fields, setFields] = useState([
    { label: "", type: "text", options: [], required: false }
  ]);

  const [formSettings, setFormSettings] = useState({
    deadline: "",
    ispublic: false,
    allowedMultipleResponses: false,
    editAfterSubmit: false
  });

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { label: "", type: "text", options: [], required: false }]);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleCreateForm = async () => {
    if (!formTitle.trim()) {
      alert("Please enter a form title");
      return;
    }

    const payload = {
      title: formTitle,
      description: formDescription,
      fields: fields,
      formsettings: formSettings
    };

    try {
      const res = await axios.post("https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/create", payload);
      alert("Form Created Successfully");
      window.location.href = `/form/${res.data.id}/preview`;
    } catch (err) {
      console.error(err);
      alert("Error creating form: " + (err.response?.data?.message || err.message));
    }
  };

  const getFieldIcon = (type) => {
    switch(type) {
      case "TEXT": return <Type className="w-4 h-4" />;
      case "OPTIONS": return <List className="w-4 h-4" />;
      case "EMAIL": return <Type className="w-4 h-4" />;
      case "FILE_UPLOAD": return <FileText className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Form</h1>
              <p className="text-gray-600 mt-1">Build your custom form with dynamic fields and settings</p>
            </div>
          </div>
          <button
            onClick={handleCreateForm}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Save className="w-5 h-5" />
            Create Form
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Title & Description Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Form Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Form Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Customer Feedback Survey"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Form Description
                </label>
                <textarea
                  placeholder="Provide a brief description of your form..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Fields Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Form Fields</h2>
                <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                  {fields.length}
                </span>
              </div>
              <button
                onClick={addField}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Field
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-md">
                        {index + 1}
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                        {getFieldIcon(field.type)}
                        <span className="text-sm font-medium text-blue-700 capitalize">
                          {field.type === "textarea" ? "Paragraph" : field.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeField(index)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Remove field"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Field Label (e.g., Full Name, Email Address)"
                      value={field.label}
                      onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        value={field.type}
                        onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all font-medium"
                      >
                        <option value="text">Text Input</option>
                        <option value="textarea">Paragraph</option>
                        <option value="radio">MCQ (Radio)</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Dropdown</option>
                        <option value="date">Date</option>
                      </select>

                      <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                        <input
                          type="checkbox"
                          checked={field.required || false}
                          onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Required Field</span>
                      </label>
                    </div>

                    {["radio", "checkbox", "select"].includes(field.type) && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2">
                          Options (comma separated)
                        </label>
                        <textarea
                          placeholder="Option 1, Option 2, Option 3"
                          value={field.options.join(",")}
                          onChange={(e) =>
                            handleFieldChange(index, "options", e.target.value.split(",").map(o => o.trim()))
                          }
                          rows={2}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">No fields yet. Click "Add Field" to start building your form.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Form Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Response Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formSettings.deadline}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>

              <div className="pt-4 border-t-2 border-gray-100 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-purple-50 transition-all">
                  <input
                    type="checkbox"
                    checked={formSettings.ispublic}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, ispublic: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700">
                      Make Form Public
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">Anyone with the link can access</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-blue-50 transition-all">
                  <input
                    type="checkbox"
                    checked={formSettings.allowedMultipleResponses}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        allowedMultipleResponses: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                      Allow Multiple Responses
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">Users can submit more than once</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-green-50 transition-all">
                  <input
                    type="checkbox"
                    checked={formSettings.editAfterSubmit}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        editAfterSubmit: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-green-700">
                      Allow Edit After Submit
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">Users can modify their responses</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;