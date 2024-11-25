/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Admin = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    package: "",
    deadline: "",
    cgpaCutoff: "",
    description: "",
    applicationLink: "",
    status: "open",
  });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    } catch (e) {
      setError("Failed to fetch jobs.");
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const isoDeadline = new Date(formData.deadline).toISOString();
    const dataToSubmit = {
      ...formData,
      deadline: isoDeadline,
    };

    try {
      if (isEditing) {
        console.log("not");
        
        await axios.put(`${backendUrl}/jobs/update/${currentJobId}`, dataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting updated successfully!");
      } else {
        await axios.post(`${backendUrl}/jobs`, dataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting created successfully!");
      }

      setFormData({
        title: "",
        company: "",
        type: "",
        location: "",
        package: "",
        deadline: "",
        cgpaCutoff: "",
        description: "",
        applicationLink: "",
        status: "open",
      });
      setIsEditing(false);
      setCurrentJobId(null);
      fetchJobs(); // Refresh job list
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Navigate to the login page
  };

  const handleEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
    setCurrentJobId(job.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`${backendUrl}/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting deleted successfully!");
        fetchJobs(); // Refresh job list
      } catch (error) {
        setError("Failed to delete job posting.");
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        style={{
          margin: "10px",
          float: "right",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        Sign Out
      </button>
      
      
      <div className=" bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Job Type"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
            placeholder="Salary Package"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="cgpaCutoff"
            value={formData.cgpaCutoff}
            onChange={handleChange}
            placeholder="CGPA Cutoff"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            placeholder="Application Link"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            {isEditing ? "Update Job" : "Create Job"}
          </button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-3xl">
      
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Job Listings</h2>
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company} - {job.location}</p>
                <p className="text-gray-500">{job.deadline}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200 flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Admin;