import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Users,
  FileText,
  Search,
  BarChart3,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Lock,
  Unlock,
  Mail,
  UserPlus,
} from "lucide-react";

const API_BASE =
  "https://violent-stacey-solai-aba6a507.koyeb.app";

const FormManager = () => {
  const [forms, setForms] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterType, setFilterType] =
    useState("all");

  // ============================================================
  // FETCH FORMS
  // ============================================================

  const fetchForms = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/v1/forms/getAll`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch forms"
        );
      }

      const data =
        await response.json();

      const extractedForms =
        data?.forms ||
        data?.data ||
        data?.allForms ||
        data ||
        [];

      setForms(
        Array.isArray(extractedForms)
          ? extractedForms
          : []
      );
    } catch (err) {
      console.error(
        "Failed to load forms:",
        err
      );

      setForms([]);

      alert(
        "Failed to load forms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // ============================================================
  // DELETE FORM
  // ============================================================

  const deleteForm = async (
    id,
    title
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${title}"?\n\n` +
          "This will also delete all responses associated with this form."
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_BASE}/v1/forms/${encodeURIComponent(
            id
          )}`,
          {
            method: "DELETE",
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      let result;

      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        result =
          await response.json();
      } else {
        result =
          await response.text();
      }

      if (!response.ok) {
        throw new Error(
          typeof result === "string"
            ? result
            : result?.message ||
                "Failed to delete form."
        );
      }

      alert(
        "Form deleted successfully!"
      );

      fetchForms();
    } catch (err) {
      console.error(
        "Failed to delete form:",
        err
      );

      alert(
        `Failed to delete form.\n\n${
          err.message
        }`
      );
    }
  };

  // ============================================================
  // COPY LINK
  // ============================================================

  const copyFormLink = async (
    formId
  ) => {
    const link =
      `${window.location.origin}/form/${formId}/preview`;

    try {
      await navigator.clipboard.writeText(
        link
      );

      alert(
        "Form link copied to clipboard!"
      );
    } catch (error) {
      console.error(error);

      alert(
        `Copy this form link:\n\n${link}`
      );
    }
  };

  // ============================================================
  // PUBLIC / PRIVATE
  // ============================================================

  const isPublicForm = (form) => {
    return (
      form?.formsettings?.publicForm ===
      true
    );
  };

  // ============================================================
  // MULTIPLE RESPONSES
  // ============================================================

  const allowsMultipleResponses = (
    form
  ) => {
    return (
      form?.formsettings
        ?.allowedMultipleResponses ===
      true
    );
  };

  // ============================================================
  // DEADLINE
  // ============================================================

  const isDeadlinePassed = (
    deadline
  ) => {
    if (!deadline) {
      return false;
    }

    const date =
      new Date(deadline);

    if (Number.isNaN(date.getTime())) {
      return false;
    }

    return date < new Date();
  };

  // ============================================================
  // FILTER
  // ============================================================

  const filteredForms =
    forms.filter((form) => {
      const matchesSearch =
        form.title
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const publicForm =
        isPublicForm(form);

      const matchesFilter =
        filterType === "all"
          ? true
          : filterType === "public"
          ? publicForm
          : filterType === "private"
          ? !publicForm
          : true;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // ============================================================
  // STATS
  // ============================================================

  const publicCount =
    forms.filter(
      (form) => isPublicForm(form)
    ).length;

  const privateCount =
    forms.filter(
      (form) => !isPublicForm(form)
    ).length;

  const activeCount =
    forms.filter(
      (form) =>
        !isDeadlinePassed(
          form.formsettings?.deadline
        )
    ).length;

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600 text-lg">
            Loading forms..
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">

                <FileText className="w-7 h-7 text-white" />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-gray-900">
                  Form Manager
                </h1>

                <p className="text-gray-600">
                  Manage and track all your forms
                </p>

              </div>
            </div>

            <Link
              to="/admin/forms/create"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg font-semibold"
            >
              <Plus className="w-5 h-5" />

              Create New Form
            </Link>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Total Forms
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {forms.length}
                  </p>
                </div>

                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">

                  <FileText className="w-6 h-6 text-blue-600" />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Public Forms
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {publicCount}
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
                  <p className="text-gray-600 text-sm font-semibold">
                    Private Forms
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {privateCount}
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
                  <p className="text-gray-600 text-sm font-semibold">
                    Active Forms
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {activeCount}
                  </p>
                </div>

                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">

                  <CheckCircle className="w-6 h-6 text-purple-600" />

                </div>
              </div>
            </div>

          </div>

          {/* SEARCH / FILTER */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">

            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex-1 relative">

                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

              </div>

              <div className="flex gap-2">

                {[
                  ["all", "All"],
                  ["public", "Public"],
                  ["private", "Private"],
                ].map(
                  ([value, label]) => (
                    <button
                      key={value}
                      onClick={() =>
                        setFilterType(
                          value
                        )
                      }
                      className={`px-4 py-3 rounded-xl font-semibold ${
                        filterType ===
                        value
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}

              </div>
            </div>
          </div>
        </div>

        {/* EMPTY */}
        {filteredForms.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">

            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchTerm
                ? "No forms found"
                : "No forms created yet"}
            </h3>

            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "Create your first form to get started"}
            </p>

            {!searchTerm && (
              <Link
                to="/admin/forms/create"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create Your First Form
              </Link>
            )}

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredForms.map(
              (form) => {

                const formId =
                  form.id ||
                  form._id;

                const publicForm =
                  isPublicForm(form);

                const multiple =
                  allowsMultipleResponses(
                    form
                  );

                const isPassed =
                  isDeadlinePassed(
                    form.formsettings
                      ?.deadline
                  );

                const accessCount =
                  form.allowedEmails
                    ?.length || 0;

                return (
                  <div
                    key={formId}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                  >

                    {/* TITLE */}
                    <div className="flex items-start justify-between mb-4">

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-2 mb-2">

                          <h3 className="text-xl font-bold text-gray-900">
                            {form.title ||
                              "Untitled Form"}
                          </h3>

                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                              publicForm
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >

                            {publicForm ? (
                              <Unlock className="w-3 h-3" />
                            ) : (
                              <Lock className="w-3 h-3" />
                            )}

                            {publicForm
                              ? "Public"
                              : "Private"}

                          </span>

                        </div>

                        {form.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {
                              form.description
                            }
                          </p>
                        )}

                      </div>
                    </div>

                    {/* INFO */}
                    <div className="grid grid-cols-2 gap-3 mb-4">

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />

                        <span>
                          {form.fields
                            ?.length ||
                            0}{" "}
                          fields
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <Users className="w-4 h-4" />

                        <span>
                          {publicForm
                            ? "Everyone"
                            : `${accessCount} users`}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <Mail className="w-4 h-4" />

                        <span>
                          {multiple
                            ? "Multiple responses"
                            : "Unique response"}
                        </span>

                      </div>

                      {form.formsettings
                        ?.deadline && (
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            isPassed
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          <Clock className="w-4 h-4" />

                          <span>
                            {isPassed
                              ? "Expired"
                              : "Active"}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* DEADLINE */}
                    {form.formsettings
                      ?.deadline && (
                      <div
                        className={`mb-4 p-3 rounded-lg ${
                          isPassed
                            ? "bg-red-50 border border-red-200"
                            : "bg-blue-50 border border-blue-200"
                        }`}
                      >

                        <div className="flex items-center gap-2 text-sm">

                          <Calendar
                            className={`w-4 h-4 ${
                              isPassed
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          />

                          <span
                            className={`font-semibold ${
                              isPassed
                                ? "text-red-700"
                                : "text-blue-700"
                            }`}
                          >
                            Deadline:{" "}
                            {new Date(
                              form.formsettings.deadline
                            ).toLocaleString()}
                          </span>

                        </div>

                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="grid grid-cols-2 gap-2">

                      {/* RESPONSES */}
                      <Link
                        to={`/admin/forms/responses/${formId}`}
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        <BarChart3 className="w-4 h-4" />

                        Responses
                      </Link>

                      {/* ACCESS */}
                      <Link
                        to={`/admin/forms/access/${formId}`}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        <UserPlus className="w-4 h-4" />

                        Access
                      </Link>

                      {/* COPY LINK */}
                      <button
                        onClick={() =>
                          copyFormLink(
                            formId
                          )
                        }
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        <ExternalLink className="w-4 h-4" />

                        Copy Link
                      </button>

                      {/* EDIT */}
                      <Link
                        to={`/admin/forms/edit/${formId}`}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        <Edit3 className="w-4 h-4" />

                        Edit
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteForm(
                            formId,
                            form.title
                          )
                        }
                        className="col-span-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />

                        Delete
                      </button>

                    </div>
                  </div>
                );
              }
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default FormManager;