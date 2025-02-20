"use client";

import { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

const Bot = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
    setSuccess(""); // Reset success message
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/feedback", formData);

      if (response.status === 201) {
        setSuccess("Feedback submitted successfully!");
        setFormData({ name: "", email: "", feedback: "" });
        setTimeout(() => {
          setOpen(false);
        }, 2000); // Auto-close after success
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to submit feedback. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-2 right-2 flex flex-col items-end">
      {/* Feedback Form (Appears Above Button) */}
      {open && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-80 mb-3 border animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Contact our team</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full resize-none p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}

      {/* Chatbot Button (Remains at Bottom) */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default Bot;
