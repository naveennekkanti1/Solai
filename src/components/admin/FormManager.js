import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Edit3, Trash2, Eye, Calendar, Users, 
  FileText, Search, Filter, BarChart3, ExternalLink,
  AlertCircle, CheckCircle, Clock, Lock, Unlock
} from "lucide-react";

const FormManager = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, public, private

  const fetchForms = async () => {
    try {
      const res = await fetch("https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/getAll");
      const data = await res.json();

      const extractedForms =
        data?.forms || data?.data || data?.allForms || data || [];

      setForms(Array.isArray(extractedForms) ? extractedForms : []);
    } catch (err) {
      console.error("Failed to load forms", err);
      setForms([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const deleteForm = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${id}`, { method: "DELETE" });
        fetchForms();
      } catch (err) {
        console.error("Failed to delete form", err);
        alert("Failed to delete form. Please try again.");
      }
    }
  };

  const copyFormLink = (formId) => {
    const link = `${window.location.origin}/form/${formId}/preview`;
    navigator.clipboard.writeText(link);
    alert("Form link copied to clipboard!");
  };

  // Filter forms
  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterType === "all" ? true :
      filterType === "public" ? form.formsettings?.ispublic !== false :
      filterType === "private" ? form.formsettings?.ispublic === false : true;
    
    return matchesSearch && matchesFilter;
  });

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Form Manager</h1>
                <p className="text-gray-600">Manage and track all your forms</p>
              </div>
            </div>

            <Link
              to="/admin/forms/create"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create New Form
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Forms</p>
                  <p className="text-3xl font-bold text-gray-900">{forms.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Public Forms</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.filter(f => f.formsettings?.ispublic !== false).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Unlock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Private Forms</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.filter(f => f.formsettings?.ispublic === false).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Active Forms</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.filter(f => !isDeadlinePassed(f.formsettings?.deadline)).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    filterType === "all"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType("public")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    filterType === "public"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => setFilterType("private")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    filterType === "private"
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Private
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forms List */}
        {filteredForms.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchTerm ? "No forms found" : "No forms created yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "Try adjusting your search or filters" 
                : "Create your first form to get started"}
            </p>
            {!searchTerm && (
              <Link
                to="/admin/forms/create"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create Your First Form
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredForms.map((form) => {
              const formId = form.id || form._id;
              const isPassed = isDeadlinePassed(form.formsettings?.deadline);
              
              return (
                <div
                  key={formId}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {form.title || "Untitled Form"}
                        </h3>
                        {form.formsettings?.ispublic === false && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Private
                          </span>
                        )}
                      </div>
                      {form.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {form.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{form.fields?.length || 0} fields</span>
                    </div>
                    {form.formsettings?.deadline && (
                      <div className={`flex items-center gap-2 text-sm ${isPassed ? 'text-red-600' : 'text-gray-600'}`}>
                        <Clock className="w-4 h-4" />
                        <span>
                          {isPassed ? "Expired" : "Active"}
                        </span>
                      </div>
                    )}
                  </div>

                  {form.formsettings?.deadline && (
                    <div className={`mb-4 p-3 rounded-lg ${
                      isPassed ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className={`w-4 h-4 ${isPassed ? 'text-red-600' : 'text-blue-600'}`} />
                        <span className={`font-semibold ${isPassed ? 'text-red-700' : 'text-blue-700'}`}>
                          Deadline: {new Date(form.formsettings.deadline).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/admin/forms/responses/${formId}`}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-sm font-semibold"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Responses
                    </Link>

                    <button
                      onClick={() => copyFormLink(formId)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-sm font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Copy Link
                    </button>

                    <Link
                      to={`/admin/forms/edit/${formId}`}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-sm font-semibold"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteForm(formId, form.title)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-sm font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormManager;