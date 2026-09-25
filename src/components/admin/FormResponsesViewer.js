import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Download,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Mail,
  Calendar,
  Lock,
  Unlock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const API_BASE =
  "https://violent-stacey-solai-aba6a507.koyeb.app";

const FormResponsesViewer = () => {
  const params = useParams();
  const formId = params.formId || params.id;

  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [expandedResponse, setExpandedResponse] =
    useState(null);

  const [error, setError] = useState("");

  // ============================================================
  // FETCH FORM + RESPONSES
  // ============================================================

  useEffect(() => {
    if (!formId || formId === "undefined") {
      setLoading(false);

      alert("Invalid form ID.");

      navigate("/admin/forms");

      return;
    }

    fetchFormAndResponses();
  }, [formId]);

  const fetchFormAndResponses = async () => {
    setLoading(true);
    setError("");

    try {
      const [formRes, responsesRes] = await Promise.all([
        fetch(
          `${API_BASE}/v1/forms/${encodeURIComponent(formId)}`
        ),

        fetch(
          `${API_BASE}/v1/forms/get/${encodeURIComponent(
            formId
          )}`
        ),
      ]);

      if (!formRes.ok) {
        const message = await readError(formRes);

        throw new Error(
          message || "Failed to load form."
        );
      }

      if (!responsesRes.ok) {
        const message = await readError(responsesRes);

        throw new Error(
          message || "Failed to load responses."
        );
      }

      const formJson = await formRes.json();
      const responsesJson = await responsesRes.json();

      setFormData(formJson);

      setResponses(
        Array.isArray(responsesJson)
          ? responsesJson
          : []
      );
    } catch (err) {
      console.error(
        "Failed to fetch form/responses:",
        err
      );

      setError(
        err.message ||
          "Failed to load form responses."
      );
    } finally {
      setLoading(false);
    }
  };

  const readError = async (response) => {
    try {
      const contentType =
        response.headers.get("content-type");

      if (
        contentType?.includes("application/json")
      ) {
        const json = await response.json();

        return (
          json?.message ||
          json?.error ||
          JSON.stringify(json)
        );
      }

      return await response.text();
    } catch {
      return "";
    }
  };

  // ============================================================
  // NORMALIZE ANSWERS
  // ============================================================

  const normalizeAnswers = (answers) => {
    if (!answers) {
      return {};
    }

    // Already object
    if (
      typeof answers === "object" &&
      !Array.isArray(answers)
    ) {
      return answers;
    }

    // Array:
    //
    // [
    //   {
    //     question: "How was the app?",
    //     answer: "Good"
    //   }
    // ]
    //
    if (Array.isArray(answers)) {
      const map = {};

      answers.forEach((item) => {
        if (!item) {
          return;
        }

        const question =
          item.question ??
          item.label ??
          item.fieldId;

        const answer = item.answer;

        if (
          question !== undefined &&
          answer !== undefined
        ) {
          map[String(question)] = answer;
        }
      });

      return map;
    }

    return {};
  };

  // ============================================================
  // ANSWER TO DISPLAY
  // ============================================================

  const formatAnswer = (answer) => {
    if (
      answer === null ||
      answer === undefined ||
      answer === ""
    ) {
      return "No answer";
    }

    if (Array.isArray(answer)) {
      return answer.join(", ");
    }

    if (typeof answer === "object") {
      return JSON.stringify(answer);
    }

    return String(answer);
  };

  // ============================================================
  // COLLECT QUESTIONS
  // ============================================================

  const questionsList = useMemo(() => {
    const questionSet = new Set();

    // Prefer form fields
    if (Array.isArray(formData?.fields)) {
      formData.fields.forEach((field) => {
        if (field?.label) {
          questionSet.add(field.label);
        }
      });
    }

    // Also collect from responses
    responses.forEach((response) => {
      const normalized =
        normalizeAnswers(response.answers);

      Object.keys(normalized).forEach((question) => {
        questionSet.add(question);
      });
    });

    return Array.from(questionSet);
  }, [formData, responses]);

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredResponses = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    if (!search) {
      return responses;
    }

    return responses.filter((response) => {
      const email =
        response.respondentEmail || "";

      const normalized =
        normalizeAnswers(response.answers);

      const answerText =
        Object.values(normalized)
          .map((value) => formatAnswer(value))
          .join(" ");

      const combinedText =
        `${email} ${answerText}`.toLowerCase();

      return combinedText.includes(search);
    });
  }, [responses, searchTerm]);

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const escapeCSV = (value) => {
    const text =
      value === null ||
      value === undefined
        ? ""
        : String(value);

    return `"${text.replace(/"/g, '""')}"`;
  };

  const exportToCSV = () => {
    if (responses.length === 0) {
      alert("No responses to export.");
      return;
    }

    const headers = [
      "Response Number",
      "Respondent Email",
      "Submission Time",
      ...questionsList,
    ];

    const rows = responses.map(
      (response, index) => {
        const normalized =
          normalizeAnswers(response.answers);

        const values = [
          responses.length - index,

          response.respondentEmail || "",

          response.submittedAt
            ? new Date(
                response.submittedAt
              ).toLocaleString()
            : "",

          ...questionsList.map((question) =>
            formatAnswer(
              normalized[question] ?? ""
            )
          ),
        ];

        return values.map(escapeCSV).join(",");
      }
    );

    const csv =
      [
        headers.map(escapeCSV).join(","),
        ...rows,
      ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;

    anchor.download =
      `${formData?.title || "form"}_responses_${Date.now()}.csv`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  // ============================================================
  // TOGGLE RESPONSE
  // ============================================================

  const toggleResponse = (responseId) => {
    setExpandedResponse((current) =>
      current === responseId
        ? null
        : responseId
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600">
            Loading responses...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
          <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Failed to load responses
          </h2>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={fetchFormAndResponses}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>

            <button
              onClick={() =>
                navigate("/admin/forms")
              }
              className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // FORM SETTINGS
  // ============================================================

  const isPublic =
    formData?.formsettings?.publicForm === true;

  const multipleResponses =
    formData?.formsettings
      ?.allowedMultipleResponses === true;

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />

            Back to Forms
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                  <BarChart3 className="w-7 h-7" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {formData?.title ||
                      "Form Responses"}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    {responses.length} response
                    {responses.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={exportToCSV}
                disabled={
                  responses.length === 0
                }
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />

                Export CSV
              </button>
            </div>

            {/* FORM SETTINGS */}
            <div className="mt-6 flex flex-wrap gap-3">

              <span
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                  isPublic
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {isPublic ? (
                  <Unlock className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}

                {isPublic
                  ? "Public Form"
                  : "Private Form"}
              </span>

              <span className="px-3 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-700">
                {multipleResponses
                  ? "Multiple Responses"
                  : "One Response Per Email"}
              </span>

              {!isPublic && (
                <span className="px-3 py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />

                  {formData?.allowedEmails
                    ?.length || 0}{" "}
                  users with access
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH */}
        {responses.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow mb-6">
            <div className="relative">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search by email or response..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        )}

        {/* RESPONSE COUNT */}
        {responses.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Showing{" "}
            <strong>
              {filteredResponses.length}
            </strong>{" "}
            of{" "}
            <strong>
              {responses.length}
            </strong>{" "}
            responses
          </div>
        )}

        {/* RESPONSES */}
        {filteredResponses.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">

            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-gray-800">
              {responses.length === 0
                ? "No responses yet"
                : "No matching responses"}
            </h3>

            {searchTerm && (
              <button
                onClick={() =>
                  setSearchTerm("")
                }
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">

            {filteredResponses.map(
              (response, index) => {
                const responseKey =
                  response.id ||
                  response._id ||
                  index;

                const isExpanded =
                  expandedResponse ===
                  responseKey;

                const normalized =
                  normalizeAnswers(
                    response.answers
                  );

                const originalIndex =
                  responses.indexOf(
                    response
                  );

                return (
                  <div
                    key={responseKey}
                    className="bg-white rounded-xl shadow overflow-hidden"
                  >
                    {/* RESPONSE HEADER */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                        toggleResponse(
                          responseKey
                        )
                      }
                    >
                      <div className="flex justify-between items-center gap-4">

                        <div className="flex gap-4 items-center min-w-0">

                          <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                            #
                            {responses.length -
                              originalIndex}
                          </div>

                          <div className="min-w-0">

                            <p className="font-semibold text-gray-900">
                              Response{" "}
                              {responses.length -
                                originalIndex}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">

                              {response.respondentEmail && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />

                                  {
                                    response.respondentEmail
                                  }
                                </span>
                              )}

                              {response.submittedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />

                                  {new Date(
                                    response.submittedAt
                                  ).toLocaleString()}
                                </span>
                              )}

                            </div>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-6 h-6 flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* RESPONSE DETAILS */}
                    {isExpanded && (
                      <div className="p-6 bg-gray-50 border-t">

                        {/* EMAIL */}
                        {response.respondentEmail && (
                          <div className="bg-white p-4 rounded-lg border mb-4">

                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                              <Mail className="w-4 h-4" />
                              Respondent Email
                            </div>

                            <p className="font-semibold text-gray-900">
                              {
                                response.respondentEmail
                              }
                            </p>
                          </div>
                        )}

                        {/* QUESTIONS */}
                        {questionsList.map(
                          (
                            question,
                            questionIndex
                          ) => (
                            <div
                              key={
                                questionIndex
                              }
                              className="bg-white p-4 my-2 rounded-lg border"
                            >
                              <p className="font-semibold text-gray-900">
                                {question}
                              </p>

                              <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                                {formatAnswer(
                                  normalized[
                                    question
                                  ]
                                )}
                              </p>
                            </div>
                          )
                        )}

                      </div>
                    )}
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

export default FormResponsesViewer;