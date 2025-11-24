import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://violent-stacey-solai-aba6a507.koyeb.app/jobs/${jobId}`);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load job details");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleBack = () => {
    navigate('/jobs');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold text-lg mb-4">
            {error || "Job not found"}
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          <span className="mr-2">←</span> Back to All Jobs
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <span className="flex items-center text-lg">
                    <span className="mr-2">🏢</span> {job.company}
                  </span>
                  <span className="flex items-center text-lg">
                    <span className="mr-2">📍</span> {job.location}
                  </span>
                </div>
              </div>
              <div className="bg-green-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold">
                Open
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 font-semibold mb-1">
                  Posted Date
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {job.postedDate}
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 font-semibold mb-1">
                  Application Deadline
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {job.lastDate}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span> Job Description
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {job.requirements && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">✓</span> Requirements
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </p>
              </div>
            )}

            {job.benefits && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🎁</span> Benefits
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {job.benefits}
                </p>
              </div>
            )}

            {job.salary && (
              <div className="bg-green-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">💰</span> Salary Range
                </h2>
                <p className="text-2xl font-bold text-green-700">{job.salary}</p>
              </div>
            )}

            {job.jobPostUrl && (
  <div className="flex justify-center">
    <a
      href={job.jobPostUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
    >
      Apply for this Position →
    </a>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;