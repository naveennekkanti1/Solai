import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Download, Users, Calendar, Eye, 
  FileText, Search, Filter, ChevronDown, ChevronUp,
  BarChart3, TrendingUp, Clock, Mail, CheckCircle
} from "lucide-react";

const FormResponsesViewer = () => {
  const params = useParams();
  const formId = params.formId || params.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedResponse, setExpandedResponse] = useState(null);

  useEffect(() => {
    if (formId && formId !== "undefined") {
      fetchFormAndResponses();
    } else {
      setLoading(false);
      alert("Invalid form ID. Please check the URL.");
      navigate("/admin/forms");
    }
  }, [formId]);

  const fetchFormAndResponses = async () => {
    try {
      const formRes = await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${formId}`);
      const formData = await formRes.json();
      setFormData(formData);

      const responsesRes = await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/get/${formId}`);
      const responsesData = await responsesRes.json();
      setResponses(Array.isArray(responsesData) ? responsesData : []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      alert(`Failed to load responses: ${err.message}`);
      navigate("/admin/forms");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Normalizes null, object, or array answers safely
  const normalizeAnswers = (answers) => {
    if (!answers) return {};

    // Already an object -> return directly
    if (typeof answers === "object" && !Array.isArray(answers)) {
      return answers;
    }

    // If it's list -> convert to object map
    if (Array.isArray(answers)) {
      const map = {};
      answers.forEach((item) => {
        if (item.question && item.answer !== undefined) {
          map[item.question] = item.answer;
        }
      });
      return map;
    }

    return {};
  };

  const getAnswerForQuestion = (response, question) => {
    const normalized = normalizeAnswers(response.answers);
    return normalized[question] || "No answer";
  };

  const exportToCSV = () => {
    if (responses.length === 0) {
      alert("No responses to export");
      return;
    }

    const questionSet = new Set();
    responses.forEach((response) => {
      const normalized = normalizeAnswers(response.answers);
      Object.keys(normalized).forEach((q) => questionSet.add(q));
    });

    const questions = Array.from(questionSet);

    let csv = "Submission Time," + questions.join(",") + "\n";

    responses.forEach((response) => {
      const time = new Date(response.submittedAt).toLocaleString();
      const normalized = normalizeAnswers(response.answers);

      const row = questions.map((q) => {
        const ans = normalized[q] || "";
        return `"${String(ans).replace(/"/g, '""')}"`;
      });

      csv += `"${time}",${row.join(",")}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData?.title || "form"}_responses_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredResponses = responses.filter((response) => {
    if (!searchTerm) return true;

    const normalized = normalizeAnswers(response.answers);
    const text = Object.values(normalized).join(" ").toLowerCase();

    return text.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading responses...
      </div>
    );
  }

  // Collect all unique questions using normalized answers
  const allQuestions = new Set();
  responses.forEach((r) => {
    const normalized = normalizeAnswers(r.answers);
    Object.keys(normalized).forEach((q) => allQuestions.add(q));
  });

  const questionsList = Array.from(allQuestions);

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
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{formData?.title || "Form Responses"}</h1>
                </div>
              </div>

              <button
                onClick={exportToCSV}
                disabled={responses.length === 0}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Export CSV
              </button>
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
                placeholder="Search responses..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* RESPONSES LIST */}
        {filteredResponses.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3>No responses yet</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResponses.map((response, index) => {
              const isExpanded =
                expandedResponse === response.id || expandedResponse === index;
              const normalized = normalizeAnswers(response.answers);

              return (
                <div key={response.id || index} className="bg-white rounded-xl shadow">
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedResponse(isExpanded ? null : response.id || index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                          #{responses.length - index}
                        </div>
                        <div>
                          <p className="font-semibold">
                            Response {responses.length - index}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {new Date(response.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 bg-gray-50 border-t">
                      {questionsList.map((question, qIndex) => (
                        <div key={qIndex} className="bg-white p-4 my-2 rounded-lg border">
                          <p className="font-semibold">{question}</p>
                          <p className="text-gray-700 mt-1">
                            {normalized[question] || "No answer"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormResponsesViewer;
