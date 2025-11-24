// JobList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://violent-stacey-solai-aba6a507.koyeb.app/jobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600">Explore exciting career opportunities</p>
          <div className="mt-6 inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-semibold">
            {jobs.length} {jobs.length === 1 ? 'Position' : 'Positions'} Available
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Openings Right Now</h3>
            <p className="text-gray-600">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <span className="flex items-center font-semibold">
                          <span className="mr-2 text-xl">🏢</span> {job.company}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-2 text-xl">📍</span> {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Open
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 text-lg line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="mr-1">📅</span> Posted: {job.postedDate}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏰</span> Deadline: {job.lastDate}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewDetails(job.id)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;