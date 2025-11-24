import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminJobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    lastDate: "",
    jobPostUrl: ""
  });
  const [activeTab, setActiveTab] = useState("create");

  const fetchJobs = async () => {
    const res = await axios.get("https://violent-stacey-solai-aba6a507.koyeb.app/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await axios.post("https://violent-stacey-solai-aba6a507.koyeb.app/jobs/admin/create", form);
    alert("Job Created Successfully!");
    setForm({
      title: "",
      company: "",
      location: "",
      description: "",
      lastDate: "",
      jobPostUrl: ""
    });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await axios.delete(`https://violent-stacey-solai-aba6a507.koyeb.app/jobs/admin/delete/${id}`);
      fetchJobs();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management Dashboard</h1>
          <p className="text-gray-600">Create and manage job postings</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "create"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Create New Job
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "manage"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Manage Jobs ({jobs.length})
            </button>
          </div>

          {/* Create Job Form */}
          {activeTab === "create" && (
            <div className="p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      placeholder="e.g., Senior React Developer"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      placeholder="e.g., Tech Solutions Inc"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      placeholder="e.g., San Francisco, CA or Remote"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      name="lastDate"
                      value={form.lastDate}
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application URL
                  </label>
                  <input
                    name="jobPostUrl"
                    value={form.jobPostUrl}
                    placeholder="https://example.com/apply"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button 
                  onClick={handleCreate}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  Create Job Posting
                </button>
              </div>
            </div>
          )}

          {/* Manage Jobs List */}
          {activeTab === "manage" && (
            <div className="p-6">
              {jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-5xl mb-4">📋</div>
                  <p className="text-gray-600">No jobs posted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                          <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                            <span className="flex items-center">
                              <span className="mr-1">🏢</span> {job.company}
                            </span>
                            <span className="flex items-center">
                              <span className="mr-1">📍</span> {job.location}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{job.description}</p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>Posted: {job.postedDate}</span>
                            <span>Deadline: {job.lastDate}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobPost;