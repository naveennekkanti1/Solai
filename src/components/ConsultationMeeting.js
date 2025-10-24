import React, { useState } from "react";
import axios from "axios";

const ConsultationMeeting = () => {
  const [formData, setFormData] = useState({
    meetingName: "",
    meetingDate: "",
    meetingTime: "",
    meetingDescription: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://violent-stacey-solai-aba6a507.koyeb.app/consultation/meetingdetails",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data || "Meeting scheduled successfully!");
      setFormData({
        meetingName: "",
        meetingDate: "",
        meetingTime: "",
        meetingDescription: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setMessage(`Error: ${error.response.data}`);
      } else {
        setMessage("Error: Unable to schedule meeting.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Schedule Consultation Meeting
      </h2>
      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("Error") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="meetingName"
          value={formData.meetingName}
          onChange={handleChange}
          placeholder="Meeting Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="meetingDate"
          value={formData.meetingDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="meetingTime"
          value={formData.meetingTime}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="meetingDescription"
          value={formData.meetingDescription}
          onChange={handleChange}
          placeholder="Meeting Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Contact Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="Contact Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="Contact Phone"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Scheduling..." : "Schedule Meeting"}
        </button>
      </form>
    </div>
  );
};

export default ConsultationMeeting;
